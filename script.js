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
    addOnsFunctions();
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

const addOnsFunctions = () => {
  windowLoaderAddOnsFunction();
  checkUncheckBox();
  toggleClass();
  addOnsFunctionsDisableButtonFunction();
  BackPageAddOns();
  YearlyMonthlyAddOnsFunctions();
  saveAddOnsStorageFunction();
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
  } else if (fullName === "" || !isFullNameValid(fullName)) {
    $(".fullname-error").css({ color: "#c83f49", fontSize: "16px" }).fadeIn();
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

const isFullNameValid = (fullName) => {
  let invalidCharsPattern = /[@1234567890!#$%^&*()\-_=+;{}[\]:;<>,?/]/;
  return !invalidCharsPattern.test(fullName);
};

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
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

//Select Plan Functions

const savePlanValueFunction = () => {
  $(".next-button, .btn-three").on("click", () => {
    const value = $("input[name = 'plans']:checked").val();
    const toggleCheck = $("#toggle-switch").is(":checked");
    if (value === undefined) {
      $(".content > div > h4")
        .text("This field is required")
        .css({ color: "#c83f49" })
        .fadeIn();
      setTimeout(() => {
        $(".content > div > h4").fadeOut();
      }, 5000);
    } else if (toggleCheck === true) {
      selectedPlan = parseInt(value) * 10;
      window.location.href = "add-ons.html";
    } else if (toggleCheck === false) {
      selectedPlan = parseInt(value) * 1;
      window.location.href = "add-ons.html";
    } else {
      console.log("Syntax error");
    }
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

/* Add-Ons Functions */
const windowLoaderAddOnsFunction = () => {
  $(".loader-page").fadeOut(500);
  $(".load-page").fadeIn(200);
};

const checkUncheckBox = () => {
  $("label").change(function () {
    $(this).toggleClass("active");
  });
};

const addOnsFunctionsDisableButtonFunction = () => {
  $(".btn-four").attr("disabled", "disabled");
};

const BackPageAddOns = () => {
  if (
    window.location.pathname.endsWith("add-ons") ||
    window.location.pathname.endsWith("add-ons.html")
  ) {
    $(".back-page, .btn-two").on("click", () => {
      window.location.href = "select-plan.html";
    });
  }
};

const YearlyMonthlyAddOnsFunctions = () => {
  const checkbox = $("#toggle-switch");

  checkbox.on("change", function () {
    const isChecked = checkbox.prop("checked");
    sessionStorage.setItem("checkboxState", isChecked);
    updatePricing(isChecked);
    saveAddOnsPricing(isChecked);
  });

  function loadCheckboxState() {
    const savedState = sessionStorage.getItem("checkboxState");
    const isChecked = savedState === "true";
    checkbox.prop("checked", isChecked);

    updatePricing(isChecked);
    saveAddOnsPricing(isChecked);
  }

  loadCheckboxState();

  function updatePricing(isYearly) {
    $(".online-service > div > h5").text(isYearly ? "+$10/yr" : "+$1/mo");
    $(".larger-storage > div >h5").text(isYearly ? "+$20/yr" : "+$2/mo");
    $(".customizable-profile > div > h5").text(isYearly ? "+$20/yr" : "+$2/mo");
  }
};

const saveAddOnsStorageFunction = () => {
  const checkboxOnlineService = $("#online-service-checkbox");
  const checkboxLargerStorage = $("#larger-storage-checkbox");
  const checkboxCustomizableProfile = $("#customizable-profile-checkbox");

  checkboxOnlineService.on("change", function () {
    const isCheckedOnlineService = checkboxOnlineService.prop("checked");
    sessionStorage.setItem("onlineServiceValue", isCheckedOnlineService);
  });

  checkboxLargerStorage.on("change", function () {
    const isCheckedLargerStorage = checkboxLargerStorage.prop("checked");
    sessionStorage.setItem("largerStorageValue", isCheckedLargerStorage);
  });

  checkboxCustomizableProfile.on("change", function () {
    const isCheckedCustomizableProfile =
      checkboxCustomizableProfile.prop("checked");
    sessionStorage.setItem(
      "customizableProfileValue",
      isCheckedCustomizableProfile
    );
  });

  function loadAddons() {
    const onlineServiceValue =
      sessionStorage.getItem("onlineServiceValue") === "true";
    const largerStorageValue =
      sessionStorage.getItem("largerStorageValue") === "true";
    const customizableProfileValue =
      sessionStorage.getItem("customizableProfileValue") === "true";

    $("#online-service-checkbox").prop("checked", onlineServiceValue);
    $("#larger-storage-checkbox").prop("checked", largerStorageValue);
    $("#customizable-profile-checkbox").prop(
      "checked",
      customizableProfileValue
    );
  }

  loadAddons();
};

const saveAddOnsPricing = (isYearly) => {};
