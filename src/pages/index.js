import "./index.css";
import FormValidator from "../script/components/FormValidator.js";
import Card from "../script/components/Card.js";
import { initialCards, defaultSettings } from "../script/utils/constants";
import Section from "../script/components/Section.js";
import ModalWithImage from "../script/components/ModalWithImage.js";
import ModalWithForm from "../script/components/ModalWithForm.js";
import UserInfo from "../script/components/UserInfo.js";

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = getNewCardElement(item);
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
const userInfo = new UserInfo(profileName.textContent, profileInfo.textContent);
const modalEdit = new ModalWithForm(".modal-edit", (inputValues) => {
  userInfo.setUserInfo(inputValues);

});
modalEdit.setEventListeners();

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener('click', () => {
  fillEditModal(userInfo.getUserInfo());
  modalEdit.open();
});

const modalAdd = new ModalWithForm(".modal-add", (item) => {
  const cardElement = getNewCardElement(item);
  cardList.prepend(cardElement);
});
modalAdd.setEventListeners();

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => { modalAdd.open(); });

function getNewCardElement(item){
  const card = new Card(item, ".card-template", () => {
    modalImage.open(item.name, item.link);
  });
  return card.createCard();
}

function fillEditModal(userInfo) {
  const modalEdit = document.querySelector(".modal-edit");
  const formName = modalEdit.querySelector(".form__input_type_name");
  const formInfo = modalEdit.querySelector(".form__input_type_description");
  formName.value = userInfo.name;
  formInfo.value = userInfo.info;
}
