export default class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }
  _toggleButtonState(inputList) {
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    const someIsInvalid = inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    if (someIsInvalid) {
      buttonElement.setAttribute("disabled", false);
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }
  _checkInputValidity(inputElement, errorMessage) {
    if (!inputElement.validity.valid) {
      this._showErrorMessage(inputElement, errorMessage);
    } else {
      this._hideErrorMessage(inputElement);
    }
  }
  _showErrorMessage(inputElement, errorMessage) {
    const formError = this._form.querySelector(`#${inputElement.id}-error`);
    formError.textContent = errorMessage;
  }
  _hideErrorMessage(inputElement) {
    const formError = this._form.querySelector(`#${inputElement.id}-error`);
    formError.textContent = "";
  }
  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement, inputElement.validationMessage);
        this._toggleButtonState(inputList);
      });
    });
  }
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
