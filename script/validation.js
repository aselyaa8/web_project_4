function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, inputElement.validationMessage);
        toggleButtonState(config, formElement, inputList);
      });
    });
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  });
}

function toggleButtonState(config, formElement, inputList) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const someIsInvalid = inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (someIsInvalid) {
    buttonElement.setAttribute("disabled", false);
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function checkInputValidity(formElement, inputElement, errorMessage) {
  if (!inputElement.validity.valid) {
    showErrorMessage(formElement, inputElement, errorMessage);
  } else {
    hideErrorMessage(formElement, inputElement, errorMessage);
  }
}

function showErrorMessage(formElement, inputElement, errorMessage) {
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  formError.textContent = errorMessage;
}

function hideErrorMessage(formElement, inputElement, errorMessage) {
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  formError.textContent = "";
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled"
});
