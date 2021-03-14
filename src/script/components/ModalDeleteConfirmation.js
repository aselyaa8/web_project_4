import Modal from "./Modal.js";

export default class ModalDeleteConfirmation extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._modal.querySelector(".form");
    this._setHandleSubmit = this._setHandleSubmit.bind(this);
  }

  _setEventListeners(id, card) {
    this.id = id;
    this.card = card;
    super.setEventListeners();
    this._form.addEventListener("submit", this._setHandleSubmit)
  }

  _setHandleSubmit(evt) {
    evt.preventDefault();
    console.log(this._handleFormSubmit);
    this._handleFormSubmit(this.id, this.card);
    this._form.removeEventListener("submit", this._setHandleSubmit)
  }

  close() {
    this._form.reset();
    super.close()
  }
  open(id, card){
    super.open();
    this._setEventListeners(id, card);
  }
}
