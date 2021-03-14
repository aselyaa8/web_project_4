
export default class Card {
  constructor({object, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._name = object.name;
    this._link = object.link;
    this._id = object._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _isOpenedCard() {
    const cardImage = this._card.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _isLiked() {
    const likeCardButton = this._card.querySelector(".card__like-button");
    likeCardButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._card)
    })
  }

  _isDeleted() {
    const deleteCardButton = this._card.querySelector(".card__delete-button");
    deleteCardButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this._card);
    });
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
    const cardText = this._card.querySelector(".card__text");
    cardText.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._setEventListeners();
    return this._card;
  }
}

