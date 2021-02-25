export default class Card {
  constructor(object, templateSelector, handleCardClick) {
    this._name = object.name;
    this._link = object.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  _isOpenedCard() {
    const cardImage = this._card.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick();
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

