import "./pages/index.css";
import FormValidator from "./script/components/FormValidator.js";
import Card from "./script/components/Card.js";
import { initialCards, defaultSettings } from "./script/utils/constants";
import Section from "./script/components/Section.js";
import ModalWithImage from "./script/components/ModalWithImage.js";
import ModalWithForm from "./script/components/ModalWithForm.js";
import UserInfo from "./script/components/UserInfo.js";
import fillEditModal from "./script/utils/utils.js"

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, ".card-template", () => {
      modalImage.open(item.name, item.link);
    });
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, ".cards");
cardList.render();

const formEdit = document.querySelector(".modal-edit").querySelector(".form");
const formAdd = document.querySelector(".modal-add").querySelector(".form");
const modalAddValidator = new FormValidator(defaultSettings, formAdd);
const modalEditValidator = new FormValidator(defaultSettings, formEdit);
modalAddValidator.enableValidation();
modalEditValidator.enableValidation();

const modalImage = new ModalWithImage(".modal-figure");
modalImage.setEventListeners();

const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__description");
const userInfo = new UserInfo(profileName.value, profileInfo.value);
const modalEdit = new ModalWithForm(".modal-edit", () => {
  userInfo.setUserInfo(modalEdit._getInputValues())
});
modalEdit.setEventListeners();

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener('click', () => {
  fillEditModal()
  modalEdit.open();
});

const modalAdd = new ModalWithForm(".modal-add", () => {
  const items = modalAdd._getInputValues();
  const object = { name: items["add-card__title"], link: items["add-card__link"] }
  const card = new Card(object, '.card-template', () => {
    modalImage.open(object.name, object.link);
  });
  const cardElement = card.createCard()
  cardList.prepend(cardElement);
});
modalAdd.setEventListeners();

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => { modalAdd.open(); });
