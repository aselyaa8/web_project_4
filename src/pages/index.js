import "./index.css";
import FormValidator from "../script/components/FormValidator.js";
import Card from "../script/components/Card.js";
import { defaultSettings } from "../script/utils/constants";
import Section from "../script/components/Section.js";
import ModalWithImage from "../script/components/ModalWithImage.js";
import ModalWithForm from "../script/components/ModalWithForm.js";
import UserInfo from "../script/components/UserInfo.js";
import Api from "../script/components/Api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-9",
  headers: {
    authorization: "1700817e-a1e9-4638-acf5-4cd690372eaf",
    "Content-Type": "application/json"
  }
});

api.getUserInfo().then((object)=>{
  placeUserInfoToDom(object.name, object.about, object.avatar)
});
// api.postCard(initialCards[6]);
// console.log(api.getInitialCards());



function placeUserInfoToDom(name, info, avatar){
  const profileNameElement = document.querySelector(".profile__name");
  const profileInfoElement = document.querySelector(".profile__description");
  const profileAvatarElement = document.querySelector(".profile__avatar");
  profileNameElement.textContent = name;
  profileInfoElement.textContent = info;
  profileAvatarElement.src = avatar
}


api.getInitialCards().then((data)=>{
  console.log(data);
  const cardList = new Section({
    items: data,
    renderer: (item) => {
      const cardElement = getNewCardElement(item);
      cardList.addItem(cardElement);
    }
  }, ".cards");
  cardList.render();

});



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
  api.postCard(item);
  // const cardElement = getNewCardElement(item);
  // cardList.prepend(cardElement);
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
