$(document).ready(() => {
  // This function runs when the DOM is fully loaded
  if (
    window.location.pathname.endsWith("select-plan.html") ||
    window.location.pathname.endsWith("select-plan")
  ) {
    selectPlanFunction();
  } else {
    // If the current URL path does not match the above conditions, call yourInfoFunction()
    yourInfoFunction();
  }
});

const yourInfoFunction = () => {
  toggleClass();
  nextStepFunction();
  windowLoaderFunction();
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

//Select Plan Functions
const BackPage = () => {
  $(".btn-one, .back-page").on("click", () => {
    window.history.back();
  });
};

const toggleYearlyMonthly = () => {
  if ($("#toggle-switch").is(":checked")) {
    alert("Checked");
  }
};

const clickFunction = () => {
  $(".plan-one, .plan-two, .plan-three").click(function () {
    $(this).toggleClass("active-plan");
  });
};

const selectPlanDisableButtonFunction = () => {
  $(".btn-three, .btn-four").attr("disabled", "disabled");
};

//Index && Select Plan Function
const windowLoaderFunction = () => {
  $(".loader-page").fadeOut(500);
  $("section").fadeIn(2500);
};

const toggleClass = () => {
  $(".btn").click(function () {
    $(".btn").removeClass("active");
    $(this).addClass("active");
  });
};

const savedStateFunctions = () => {
  const checkbox = $("#toggle-switch");

  function loadCheckboxState() {
    const savedState = localStorage.getItem("checkboxState");
    if (savedState === "true") {
      checkbox.prop("checked", true);
    }
  }

  loadCheckboxState();
  checkbox.on("change", function () {
    localStorage.setItem("checkboxState", checkbox.prop("checked"));
  });
};

const selectPlanErrorHandlingFunction = () => {};
