export default class Modal {
  constructor(modalSelector) {
    console.log(modalSelector);
    this._modal = document.querySelector(modalSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._modal.addEventListener("click", (evt) => {
      if (evt.target.closest(".modal__container") === null) {
        this.close();
      }
      if (evt.target.closest(".modal__close-button")) {
        this.close();
      }
    })
  }
}

