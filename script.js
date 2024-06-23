$(document).ready(() => {
  // This function runs when the DOM is fully loaded
  if (
    window.location.pathname.endsWith("select-plan.html") ||
    window.location.pathname.endsWith("select-plan")
  ) {
    selectPlanFunction();
  } else {
    yourInfoFunction();
  }
});

const yourInfoFunction = () => {
  toggleClass();
  windowLoaderFunction();
  nextStepFunction();
};

const windowLoaderFunction = () => {
  $(".loader-page").fadeOut(500);
  $("section").fadeIn(2500);
};

const selectPlanFunction = () => {
  selectPlanDisableButtonFunction();
  toggleClass();
  clickFunction();
  BackPage();
  selectPlanErrorHandlingFunction();
  toggleYearlyMonthly();
  windowLoaderFunction();
  savedStateFunctions();
  savedStateTwoFunctions();
  nextStepButtonFunction();
};

var fullName, email, phoneNumber;

//Index Functions

const nextStepFunction = () => {
  $(".next-step-button, .btn-two").on("click", () => {
    fullName = $("#fullName-input").val();
    email = $("#email-input").val();
    phoneNumber = $("#phonenumber-input").val();

    errorHandling(fullName, email, phoneNumber);
  });
};

const errorHandling = (fullName, email, phoneNumber) => {
  if (fullName === "" && email === "" && phoneNumber === "") {
    $(".btn-two, .btn-three, .btn-four").attr("disabled", "disabled");
    $(".btn").removeClass("active");
    $(".btn-one").addClass("active");

    $(".error").css({ color: "#c83f49", fontSize: "16px" }).fadeIn();
    setTimeout(() => {
      $(".error").css({ color: "#c83f49" }).fadeOut();
    }, 3000);
  } else if (fullName === "") {
    $(".fullname-error").css({ color: "#c83f49" }).fadeIn();
    setTimeout(() => {
      $(".fullname-error").fadeOut();
    }, 3000);
  } else if (email === "" || !isValidEmail(email)) {
    $(".email-error").css({ color: "#c83f49", fontSize: "16px" }).fadeIn();
    setTimeout(() => {
      $(".email-error").fadeOut();
    }, 3000);
  } else if (phoneNumber === "") {
    $(".phonenumber-error")
      .css({ color: "#c83f49", fontSize: "16px" })
      .fadeIn();
    setTimeout(() => {
      $(".phonenumber-error").fadeOut();
    }, 3000);
  } else if (
    phoneNumber.toString().length > 11 ||
    phoneNumber.toString().length < 11
  ) {
    $(".phonenumber-error")
      .text("Limit: 11 characters")
      .css({ color: "#c83f49", fontSize: "16px" })
      .fadeIn();
    setTimeout(() => {
      $(".phonenumber-error").fadeOut();
    }, 3000);
  } else if (phoneNumber.substring(0, 1) != 0) {
    $(".phonenumber-error")
      .text("First character is incorrect")
      .css({ color: "#c83f49", marginLeft: "112px", fontSize: "16px" })
      .fadeIn(1000);
    setTimeout(() => {
      $(".phonenumber-error").fadeOut(1000);
    }, 3000);
  } else {
    $("#page")[0].click();
    $(".btn-two]").removeAttr("disabled", "disabled");
  }
};

const isValidEmail = (email) => {
  if (email.includes("@gmail.com") || email.includes("@yahoo.com")) {
    return true;
  } else if (email.includes("@gmail.com")) {
    return true;
  } else if (email.includes("@yahoo.com")) {
    return true;
  } else {
    return false;
  }
};

const toggleClass = () => {
  $(".btn").click(function () {
    $(".btn").removeClass("active");
    $(this).addClass("active");
  });
};

//Select Plan Functions

const clickFunction = () => {
  $(".icon").click(function () {
    $();
  });

  planOne = $(".icon-one > svg, .icon-one > h4, .icon-one > p").on(
    "click",
    () => {
      const checkbox = $("#arcade-checkbox")[0];
      checkbox.checked = !checkbox.checked;
      saveCheckboxState("arcade", checkbox.checked);
    }
  );

  planTwo = $(".icon-two > svg, .icon-two > h4, .icon-two > p").on(
    "click",
    () => {
      const checkbox = $("#advanced-checkbox")[0];
      checkbox.checked = !checkbox.checked;
      saveCheckboxState("advanced", checkbox.checked);
    }
  );

  planThree = $(".icon-three > svg, .icon-three > h4, .icon-three > p").on(
    "click",
    () => {
      const checkbox = $("#pro-checkbox")[0];
      checkbox.checked = !checkbox.checked;
      saveCheckboxState("pro", checkbox.checked);
    }
  );
};

function restoreCheckboxState(key) {
  const checkbox = $("#" + key + "-checkbox")[0];
  const savedState = localStorage.getItem(key);
  if (savedState !== null) {
    checkbox.checked = savedState === "true";
  }
}

restoreCheckboxState("arcade");
restoreCheckboxState("advanced");
restoreCheckboxState("pro");

const nextStepButtonFunction = () => {
  $(".next-button").on("click", () => {
    const toggleCheck = $("#toggle-switch").is(":checked");
    const arcadeCheckbox = $("#arcade-checkbox").is(":checked");
    if (toggleCheck && arcadeCheckbox) {
      alert("Yearly");
      alert("$90/yr");
    } else {
      alert("Working");
    }
  });
};

const BackPage = () => {
  $(".btn-one, .back-page").on("click", () => {
    window.history.back();
  });
};

const toggleYearlyMonthly = () => {
  $("#toggle-switch").on("change", function () {
    if ($(this).is(":checked")) {
      $(this).attr("value", "true");
    } else {
      $(this).attr("value", "false");
    }
  });
};

function saveCheckboxState(key, value) {
  localStorage.setItem(key, value);
}

const selectPlanDisableButtonFunction = () => {
  $(".btn-three, .btn-four").attr("disabled", "disabled");
};

//Index && Select Plan Function

const savedStateFunctions = () => {
  const checkbox = $("#toggle-switch");

  function loadCheckboxState() {
    const savedState = localStorage.getItem("checkboxState");
    const isChecked = savedState === "true";
    checkbox.prop("checked", isChecked);

    // Update pricing information for all plans
    updatePricing(isChecked);
  }

  // Call loadCheckboxState during page load
  loadCheckboxState();

  // Handle the checkbox change event
  checkbox.on("change", function () {
    const isChecked = checkbox.prop("checked");
    localStorage.setItem("checkboxState", isChecked);
    updatePricing(isChecked); // Update pricing information when the checkbox changes
  });

  // Function to update pricing based on the checkbox state
  function updatePricing(isYearly) {
    $(".icon-one > p").text(isYearly ? "$90/year" : "$9/mo");
    $(".icon-one > h5").css({ display: isYearly ? "block" : "none" });
    $(".icon-one > h5").text(isYearly ? "2 months free" : "");
    $(".icon-two > p").text(isYearly ? "$120/year" : "$12/mo");
    $(".icon-two > h5").css({ display: isYearly ? "block" : "none" });
    $(".icon-two > h5").text(isYearly ? "2 months free" : "");
    $(".icon-three > p").text(isYearly ? "$150/year" : "$15/mo");
    $(".icon-three > h5").css({ display: isYearly ? "block" : "none" });
    $(".icon-three > h5").text(isYearly ? "2 months free" : "");
    $("#pro-checkbox, #advanced-checkbox, #arcade-checkbox").css({
      height: isYearly ? "150px" : "130px",
    });
  }
};

const savedStateTwoFunctions = () => {
  const arcadeCheckbox = $("#arcade-checkbox");

  function loadCheckboxState() {
    const savedState = localStorage.getItem("arcadeCheckboxState");

    if (savedState === "true") {
      arcadeCheckbox.prop("checked", true);
      planOne.prop("checked", true);
    }
  }

  loadCheckboxState();

  arcadeCheckbox.on("change", function () {
    localStorage.setItem("arcadeCheckboxState", arcadeCheckbox.prop("checked"));
  });
};
console.log("Loaded successfully!"); // Check if this message appears in the console

const selectPlanErrorHandlingFunction = () => {};
