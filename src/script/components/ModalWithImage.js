import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
  }
  open(name, link) {
    const modalImage = this._modal.querySelector(".modal__image");
    const modalCaption = this._modal.querySelector(".modal__image-caption");
    modalImage.src = link;
    modalImage.alt = name;
    modalCaption.textContent = name;
    super.open();
  }
}


