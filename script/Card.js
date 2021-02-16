import {openModal, closeByEsc, closeModal} from "./utils.js";
const modalFigure = document.querySelector(".modal-figure");
const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__image-caption");

const openFigureModal = (name, link) => {
  openModal(modalFigure);
  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;
}

class Card {
  constructor(object, templateSelector) {
    this._name = object.name;
    this._link = object.link;
    this._templateSelector = templateSelector;
  }

  _isOpenedCard() {
    const cardImage = this._card.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      openFigureModal(this._name, this._link);
    });
  }
  _isLiked() {
    const likeCardButton = this._card.querySelector(".card__like-button");
    likeCardButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle('card__like-button_active');
    })
  }
  _isDeleted() {
    const deleteCardButton = this._card.querySelector(".card__delete-button");
    deleteCardButton.addEventListener("click", () => { this._card.remove() });
  }

  _setEventListeners() {
    this._isOpenedCard();
    this._isDeleted();
    this._isLiked();
  }
  _getCardTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".card");
    return cardTemplate;
  }
  createCard() {
    this._card = this._getCardTemplate().cloneNode(true);
    const cardImage = this._card.querySelector(".card__image");
    const cardText = this._card.querySelector(".card__text")
    cardText.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._setEventListeners();
    return this._card;
  }
}
export default Card;
export { openFigureModal};
