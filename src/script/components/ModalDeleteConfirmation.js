import Modal from "./Modal.js";

export default class ModalDeleteConfirmation extends Modal {
  constructor({ modalSelector, handleFormSubmit }) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._modal.querySelector(".form");
    this._setHandleSubmit = this._setHandleSubmit.bind(this);
  }

  _setHandleSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this.id, this.card);
  }

  close() {
    this._form.removeEventListener("submit", this._setHandleSubmit)
    super.close()
  }
  open(id, card) {
    super.open();
    this.id = id;
    this.card = card;
    this._form.addEventListener("submit", this._setHandleSubmit)
  }
}
