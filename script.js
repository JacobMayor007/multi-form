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
  } else if (
    window.location.pathname.endsWith("summary.html") ||
    window.location.pathname.endsWith("summary")
  ) {
    summaryFunctions();
  } else {
    yourInfoFunction();
  }
});

const yourInfoFunction = () => {
  windowLoaderFunction();
  toggleClass();
  nextStepIndexFunction();
  saveInfoFunction();
  nextStepFunction();
};

const selectPlanFunction = () => {
  windowLoaderSelectedPlanFunction();
  toggleClass();
  savedStateFunctions();
  savePlanValueFunction();
  toggleClass();
  BackPage();
  nextStepPlanFunction();
  saveSelectedPlanFunction();
  cancelFunction();
};

const addOnsFunctions = () => {
  windowLoaderAddOnsFunction();
  checkUncheckBox();
  toggleClass();
  BackPageAddOns();
  nextStepAddOnsFunction();
  YearlyMonthlyAddOnsFunctions();
  saveAddOnsStorageFunction();
  saveAddOnsPricing();
};

const summaryFunctions = () => {
  windowLoaderSummaryFunction();
  buttonsSummary();
  confirmButton();
  summaryOfAll();
};

let fullName, email, phoneNumber, selectedPlan;

var onlineService, largerStorage, customizableProfile;

//Index Functions

const nextStepIndexFunction = () => {
  $(".btn-two").on("click", () => {
    window.location.href = "select-plan.html";
  });

  $(".btn-three").on("click", () => {
    window.location.href = "add-ons.html";
  });

  $(".btn-four").on("click", () => {
    window.location.href = "summary.html";
  });
};

const nextStepFunction = () => {
  $(".next-step-button").on("click", () => {
    fullName = $("#fullName-input").val();
    email = $("#email-input").val();
    phoneNumber = $("#phonenumber-input").val();

    errorHandling(fullName, email, phoneNumber);
  });
};

const errorHandling = (fullName, email, phoneNumber) => {
  let enable = false;
  if (fullName === "" && email === "" && phoneNumber === "") {
    // $(".btn-two, .btn-three, .btn-four").attr("disabled", "disabled");
    // $(".btn").removeClass("active");
    // $(".btn-one").addClass("active");

    $(".error").css({ color: "#c83f49" }).fadeIn();
    setTimeout(() => {
      $(".error").css({ color: "#c83f49" }).fadeOut();
    }, 3000);
  } else if (fullName === "" || !isFullNameValid(fullName)) {
    $(".fullname-error").css({ color: "#c83f49" }).fadeIn();
    setTimeout(() => {
      $(".fullname-error").fadeOut();
    }, 3000);
  } else if (email === "" || !isValidEmail(email)) {
    $(".email-error").css({ color: "#c83f49" }).fadeIn();
    setTimeout(() => {
      $(".email-error").fadeOut();
    }, 3000);
  } else if (phoneNumber === "") {
    $(".phonenumber-error").css({ color: "#c83f49" }).fadeIn();
    setTimeout(() => {
      $(".phonenumber-error").fadeOut();
    }, 3000);
  } else if (
    phoneNumber.toString().length > 11 ||
    phoneNumber.toString().length < 11
  ) {
    $(".phonenumber-error")
      .text("Limit: 11 characters")
      .css({ color: "#c83f49" })
      .fadeIn();
    setTimeout(() => {
      $(".phonenumber-error").fadeOut();
    }, 3000);
  } else if (phoneNumber.substring(0, 1) != 0) {
    $(".phonenumber-error")
      .text("First Character Error")
      .css({ color: "#c83f49", marginLeft: "18px", fontSize: "16px" })
      .fadeIn(1000);
    setTimeout(() => {
      $(".phonenumber-error").fadeOut(1000);
    }, 3000);
  } else {
    window.location.href = "select-plan.html";
    saveInfoFunction();
    enable = true;
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

const nextStepPlanFunction = () => {
  $(".btn-one, .back-page").on("click", () => {
    window.location.href = "index.html";
  });

  $(".btn-three").on("click", () => {
    window.location.href = "add-ons.html";
  });

  $(".btn-four").on("click", () => {
    window.location.href = "summary.html";
  });
};

const savePlanValueFunction = () => {
  $(".next-button, .btn-three").on("click", () => {
    let value = $("input[name = 'plans']:checked").val();
    const toggleCheck = $("#toggle-switch").is(":checked");
    if (value === undefined) {
      $(".content > div > h4")
        .text("This field is required")
        .css({ color: "#c83f49" })
        .fadeIn();
      setTimeout(() => {
        $(".content > div > h4").fadeOut();
      }, 5000);
    } else {
      if (toggleCheck) {
        value = parseInt(value) * 10;
      }
      sessionStorage.setItem("selectedPlanValue", value);
      window.location.href = "add-ons.html";
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
    $(".option-one > h5")
      .css({ display: isYearly ? "block" : "none" })
      .text(isYearly ? "2 months free" : "");
    $(".option-two > p").text(isYearly ? "$120/year" : "$12/mo");
    $(".option-two > h5")
      .css({ display: isYearly ? "block" : "none" })
      .text(isYearly ? "2 months free" : "");
    $(".option-three > p").text(isYearly ? "$150/year" : "$15/mo");
    $(".option-three > h5")
      .css({ display: isYearly ? "block" : "none" })
      .text(isYearly ? "2 months free" : "");
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
};

const windowLoaderSelectedPlanFunction = () => {
  $(".loader-page").fadeOut(500);
  $(".load-page").fadeIn(200);
};

const toggleClass = () => {
  $(".btn").click(function () {
    $(".btn").removeClass("active");
    $(this).addClass("active");
  });
};

/* Add-Ons Functions */
const nextStepAddOnsFunction = () => {
  $(".btn-one").on("click", () => {
    window.location.href = "index.html";
  });

  $(".btn-two").on("click", () => {
    window.location.href = "select-plan.html";
  });

  $(".next-button, .btn-four").on("click", () => {
    window.location.href = "summary.html";
  });
};

const windowLoaderAddOnsFunction = () => {
  $(".loader-page").fadeOut(500);
  $(".load-page").fadeIn(200);
};

const checkUncheckBox = () => {
  $("label").change(function () {
    $(this).toggleClass("active");
  });
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
    customizableProfile = $(".customizable-profile > div > h5").text(
      isYearly ? "+$20/yr" : "+$2/mo"
    );
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

    if (onlineServiceValue) {
      checkboxOnlineService.prop("checked", onlineServiceValue);
      $(".online-service").addClass("active");

      $("#online-service-checkbox").val(10);
    }
    if (largerStorageValue) {
      checkboxLargerStorage.prop("checked", largerStorageValue);
      $(".larger-storage").addClass("active");
    }
    if (customizableProfileValue) {
      checkboxCustomizableProfile.prop("checked", customizableProfileValue);
      $(".customizable-profile").addClass("active");
    }
  }

  loadAddons();
};

const saveAddOnsPricing = (isYearly) => {
  $(".next-button, .btn-four").on("click", () => {
    const onlineServiceValue =
      sessionStorage.getItem("onlineServiceValue") === "true";
    const largerStorageValue =
      sessionStorage.getItem("largerStorageValue") === "true";
    const customizableProfileValue =
      sessionStorage.getItem("customizableProfileValue") === "true";
    let totalPrice = 0;

    if (isYearly) {
      if (onlineServiceValue) {
        totalPrice += 10;
      }
      if (largerStorageValue) {
        totalPrice += 20;
      }
      if (customizableProfileValue) {
        totalPrice += 20;
      }
      sessionStorage.setItem("totalPrice", totalPrice);
    }

    if (isYearly === false) {
      if (onlineServiceValue) {
        totalPrice += 1;
      }
      if (largerStorageValue) {
        totalPrice += 2;
      }
      if (customizableProfileValue) {
        totalPrice += 2;
      }
      sessionStorage.setItem("totalPrice", totalPrice);
    }
    window.location.href = "summary.html";
  });
};

/* Summary Sections */

const windowLoaderSummaryFunction = () => {
  $(".loader-page").fadeOut();
  $(".load-page").fadeIn();
};

const summaryOfAll = () => {
  const checkboxState = sessionStorage.getItem("checkboxState") === "true";
  const totalPrice = sessionStorage.getItem("totalPrice");
  var selectedPlan = sessionStorage.getItem("selectedPlan").split("-");
  selectedPlan = selectedPlan[0].toLowerCase();
  const firstCharacter = selectedPlan.slice(0, 1).toUpperCase();
  const restOfCharacter = selectedPlan.slice(1, selectedPlan.length);
  const conCat = firstCharacter + restOfCharacter;
  const onlineServiceValue =
    sessionStorage.getItem("onlineServiceValue") === "true";
  const largerStorageValue =
    sessionStorage.getItem("largerStorageValue") === "true";
  const customizableProfileValue =
    sessionStorage.getItem("customizableProfileValue") === "true";
  const selectedPlanValue = sessionStorage.getItem("selectedPlanValue");
  let totalPriceValue = parseInt(totalPrice) + parseInt(selectedPlanValue);

  $(".selected-plan").text(`${conCat}`).css("color", "#01386a");

  $(".monthly-yearly-total").text(
    checkboxState ? "Total (per year)" : "Total (per month)"
  );

  $(".monthly-yearly")
    .text(checkboxState ? "(Yearly)" : "(Monthly)")
    .css("color", "#01386a");

  $(".row > div > .summary-label >div > h3")
    .text("$" + selectedPlanValue + (checkboxState ? "/yr" : "/mo"))
    .css({ color: "#01386a" });

  $(".add-ons-one")
    .text(onlineServiceValue ? "Online Service Value" : "")
    .css({ display: onlineServiceValue ? "block" : "none" });

  $(".add-ons-two")
    .text(largerStorageValue ? "Larger Storage" : "")
    .css({ display: largerStorageValue ? "block" : "none" });

  $(".add-ons-three")
    .text(customizableProfileValue ? "Customizable Profile" : "")
    .css({ display: customizableProfileValue ? "block" : "none" });

  if (onlineServiceValue) {
    $(".add-ons-one-value").text(checkboxState ? "$10/yr" : "$1/mo");
  }

  if (largerStorageValue) {
    $(".add-ons-two-value").text(checkboxState ? "$20/yr" : "$2/mo");
  }

  if (customizableProfileValue) {
    $(".add-ons-three-value").text(checkboxState ? "$20/yr" : "$2/mo");
  }

  $(".totalPriceValue")
    .text(checkboxState ? `$${totalPriceValue}/yr` : `$${totalPriceValue}/mo`)
    .css({ fontWeight: "600" });
};

const buttonsSummary = () => {
  $(".back-page, .btn-three").on("click", () => {
    window.location.href = "add-ons.html";
  });

  $(".btn-two").on("click", () => {
    window.location.href = "select-plan.html";
  });

  $(".btn-one").on("click", () => {
    window.location.href = "index.html";
  });
};

const confirmButton = () => {
  $(".confirm-button").on("click", () => {
    const fullNameValue = sessionStorage.getItem("fullNameValue");
    const phoneNumberValue = sessionStorage.getItem("phoneNumberValue");
    const emailValue = sessionStorage.getItem("emailValue");
    const selectedPlan = sessionStorage.getItem("selectedPlan");

    if (!fullNameValue && !phoneNumberValue && !emailValue) {
      window.alert(
        "There is a missing field that needs to be filled out!\nPlease fill out the field."
      );
      setTimeout(() => {
        window.location.href = "index.html";
      }, 300);
    } else if (!selectedPlan) {
      alert(
        "There is a missing field that needs to be filled out!\nPlease fill out the field."
      );
      setTimeout(() => {
        window.location.href = "select-plan.html";
      }, 300);
    } else {
      $(".content").fadeOut();
      $(".confirm-button").fadeOut();
      $(".back-page").fadeOut();
      sessionStorage.clear();

      setTimeout(() => {
        $(".thank-you-content")
          .css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          })
          .fadeIn();
      }, 500);

      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    }
  });
};
