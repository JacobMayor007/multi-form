$(document).ready(() => {
  // This function runs when the DOM is fully loaded
  if (
    window.location.pathname.endsWith("select-plan.html") ||
    window.location.pathname.endsWith("select-plan")
  ) {
    selectPlanFunction();
  } else if (
    window.location.pathname.endsWith("add-ons.html") ||
    window.location.pathname.endsWith("add-ons")
  ) {
  } else {
    yourInfoFunction();
  }
});

const yourInfoFunction = () => {
  windowLoaderFunction();
};

const selectPlanFunction = () => {
  windowLoaderSelectedPlanFunction();
  selectPlanDisableButtonFunction();
  savedStateFunctions();
  savePlanValueFunction();
  toggleClass();
  BackPage();
  saveSelectedPlanFunction();
  cancelFunction();
  getInformation();
};

let fullName, email, phoneNumber, selectedPlan;

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
    window.location.href = "select-plan.html";
    saveInfoFunction();
    $(".btn-two").removeAttr("disabled");
  }
};

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

//Select Plan Functions

const savePlanValueFunction = () => {
  $(".next-button").on("click", () => {
    const value = $("input[name = 'plans']:checked").val();
    const toggleCheck = $("#toggle-switch").is(":checked");
    if (toggleCheck === true) {
      selectedPlan = parseInt(value) * 10;
    } else {
      selectedPlan = parseInt(value) * 1;
    }
    window.location.href = "add-ons.html";
  });
};
const BackPage = () => {
  if (
    window.location.pathname.endsWith("select-plan") ||
    window.location.pathname.endsWith("select-plan.html")
  ) {
    $(".back-page, .btn-one").on("click", () => {
      window.location.href = "index.html";
    });
  }
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

const selectPlanDisableButtonFunction = () => {
  $(".btn-three, .btn-four").attr("disabled", "disabled");
};

const savedStateFunctions = () => {
  const checkbox = $("#toggle-switch");

  checkbox.on("change", function () {
    const isChecked = checkbox.prop("checked");
    sessionStorage.setItem("checkboxState", isChecked);
    updatePricing(isChecked);
  });

  function loadCheckboxState() {
    const savedState = sessionStorage.getItem("checkboxState");
    const isChecked = savedState === "true";
    checkbox.prop("checked", isChecked);

    updatePricing(isChecked);
  }

  loadCheckboxState();

  // Function to update pricing based on the checkbox state
  function updatePricing(isYearly) {
    $(".option-one > p").text(isYearly ? "$90/year" : "$9/mo");
    $(".option-one > h5").css({ display: isYearly ? "block" : "none" });
    $(".option-one > h5").text(isYearly ? "2 months free" : "");
    $(".option-two > p").text(isYearly ? "$120/year" : "$12/mo");
    $(".option-two > h5").css({ display: isYearly ? "block" : "none" });
    $(".option-two > h5").text(isYearly ? "2 months free" : "");
    $(".option-three > p").text(isYearly ? "$150/year" : "$15/mo");
    $(".option-three > h5").css({ display: isYearly ? "block" : "none" });
    $(".option-three > h5").text(isYearly ? "2 months free" : "");
    $("#pro-radio, #advanced-radio, #arcade-radio").css({
      height: isYearly ? "150px" : "130px",
    });
  }
};

const saveSelectedPlanFunction = () => {
  $("input[name='plans']").on("change", function () {
    saveSelectedPlan($(this).attr("id"));
  });

  function saveSelectedPlan(planId) {
    sessionStorage.setItem("selectedPlan", planId);
  }
  function loadSelectedPlan() {
    const selectedPlan = sessionStorage.getItem("selectedPlan");
    if (selectedPlan) {
      $(`#${selectedPlan}`).prop("checked", true);
    }
  }
  loadSelectedPlan();
};

const saveInfoFunction = () => {
  // Save the fullName value to local storage when the input changes
  $("#fullName-input").on("input", function () {
    const fullName = $(this).val();
    sessionStorage.setItem("fullNameValue", fullName);
  });
  $("#email-input").on("input", () => {
    const email = $("#email-input").val();
    sessionStorage.setItem("emailValue", email);
  });

  $("#phonenumber-input").on("input", function () {
    const phoneNumber = $(this).val();
    sessionStorage.setItem("phoneNumberValue", phoneNumber);
  });

  function loadSelectedPlan() {
    const fullNameValue = sessionStorage.getItem("fullNameValue");
    const emailValue = sessionStorage.getItem("emailValue");
    const phoneNumberValue = sessionStorage.getItem("phoneNumberValue");
    if (fullNameValue) {
      $("#fullName-input").val(fullNameValue);
    }
    if (emailValue) {
      $("#email-input").val(emailValue);
    }
    if (phoneNumberValue) {
      $("#phonenumber-input").val(phoneNumberValue);
    }
  }

  loadSelectedPlan();
};

const cancelFunction = () => {
  $("#btnSubmit").on("click", () => {
    var allRadioButtos = $("input[type='radio']:checked");
    allRadioButtos.each(function () {
      allRadioButtos.prop("checked", false);
      sessionStorage.removeItem("selectedPlan");
    });
  });
};
//Index && Select Plan Function

const windowLoaderFunction = () => {
  $(".loader-page").fadeOut(500);
  $(".load-page").fadeIn(1500);
  toggleClass();
  nextStepFunction();
  saveInfoFunction();
};

const windowLoaderSelectedPlanFunction = () => {
  $(".loader-page").fadeOut(500);
  $(".load-page").fadeIn(200);
  toggleClass();
};

const toggleClass = () => {
  $(".btn").click(function () {
    $(".btn").removeClass("active");
    $(this).addClass("active");
  });
};
