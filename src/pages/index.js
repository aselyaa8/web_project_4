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

function placeUserInfoToDom(name, about, avatar) {
  const profileNameElement = document.querySelector(".profile__name");
  const profileInfoElement = document.querySelector(".profile__description");
  const profileAvatarElement = document.querySelector(".profile__avatar");
  profileNameElement.textContent = name;
  profileInfoElement.textContent = about;
  profileAvatarElement.src = avatar
}

api.getAppInfo().then(([initialCards, userInfo]) => {
  const myId = userInfo._id;
  const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      let cardElement;
      if (myId === item.owner._id) {
        cardElement = getNewCardElement(item);
      } else {
        cardElement = getNewCardElementWithNoBin(item)
      }
      cardList.addItem(cardElement);
    }
  }, ".cards");
  cardList.render();
  placeUserInfoToDom(userInfo.name, userInfo.about, userInfo.avatar);
})

const formEdit = document.querySelector(".modal-edit").querySelector(".form");
const formAdd = document.querySelector(".modal-add").querySelector(".form");
const formAvatarEdit = document.querySelector(".modal-avatar-edit").querySelector(".form");
const modalAddValidator = new FormValidator(defaultSettings, formAdd);
const modalEditValidator = new FormValidator(defaultSettings, formEdit);
const modalAvatarEditValidator = new FormValidator(defaultSettings, formAvatarEdit);
modalAddValidator.enableValidation();
modalEditValidator.enableValidation();
modalAvatarEditValidator.enableValidation();

const modalImage = new ModalWithImage(".modal-figure");
modalImage.setEventListeners();


const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__description");
const userInfo = new UserInfo(profileName.textContent, profileInfo.textContent);

const modalEdit = new ModalWithForm(".modal-edit", (inputValues) => {
  api.updateUserInfo(inputValues).then((res) => {
    placeUserInfoToDom(res.name, res.about, res.avatar)
    console.log(res);
  })
});

modalEdit.setEventListeners();

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener('click', () => {
  fillEditModal(userInfo.getUserInfo());
  modalEdit.open();
});

const modalAdd = new ModalWithForm(".modal-add", (item) => {
  api.postCard(item).then((data) => {
    console.log(data);
    const cardElement = getNewCardElement(data);
    const cardList = document.querySelector(".cards");
    cardList.prepend(cardElement);
  });

});
modalAdd.setEventListeners();

const profileAvatar = document.querySelector(".profile__avatar");
const modalAvatarEdit = new ModalWithForm(".modal-avatar-edit", (item) => {
  api.updateUserAvatar(item.avatar).then((res) => {
    profileAvatar.src = res.avatar;
  });
});

modalAvatarEdit.setEventListeners();
const avatarEditButton = document.querySelector(".profile__avatar-edit");
avatarEditButton.addEventListener("click", () => { modalAvatarEdit.open(); });

// const modalDeleteConfirm = document.querySelector("modal-delete-confirm");
// deleteConfirmButton = modalDeleteConfirm.querySelector("form__save-button");

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => { modalAdd.open(); });

function getNewCardElementWithNoBin(item) {
  const cardElement = getNewCardElement(item);
  cardElement.querySelector(".card__delete-button").classList.add("card__delete-button_disabled")
  return cardElement;
}

function getNewCardElement(item) {
  const card = new Card(item, ".card-template", () => {
    modalImage.open(item.name, item.link);
  }, (id) => {
    console.log("blabla handleDelete card");
    api.deleteCard(id).then((res) => {
      console.log(res);
    });
  });
  return card.createCard();
}

function fillEditModal(userInfo) {
  const modalEdit = document.querySelector(".modal-edit");
  const formName = modalEdit.querySelector(".form__input_type_name");
  const formInfo = modalEdit.querySelector(".form__input_type_description");
  formName.value = userInfo.name;
  formInfo.value = userInfo.about;
}
