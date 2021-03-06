import "./index.css";
import FormValidator from "../script/components/FormValidator.js";
import Card from "../script/components/Card.js";
import { defaultSettings } from "../script/utils/constants";
import Section from "../script/components/Section.js";
import ModalWithImage from "../script/components/ModalWithImage.js";
import ModalWithForm from "../script/components/ModalWithForm.js";
import ModalDeleteConfirmation from "../script/components/ModalDeleteConfirmation.js";
import UserInfo from "../script/components/UserInfo.js";
import Api from "../script/components/Api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-9",
  headers: {
    authorization: "1700817e-a1e9-4638-acf5-4cd690372eaf",
    "Content-Type": "application/json"
  }
});

const modalEditElement = document.querySelector(".modal-edit");
const formName = modalEditElement.querySelector(".form__input_type_name");
const formInfo = modalEditElement.querySelector(".form__input_type_description");

const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");
const userInfo = new UserInfo(profileName, profileInfo, profileAvatar);

let cardList;
api.getAppInfo().then(([initialCards, userData]) => {
  const myId = userData._id;
  cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      //see bin only on my cards
      let cardElement;
      if (myId === item.owner._id) {
        cardElement = getNewCardElement(item);
      } else {
        cardElement = getNewCardElementWithNoBin(item)
      }
      //see my likes
      if (item.likes.some(({ _id }) => _id === myId)) {
        const likeButton = cardElement.querySelector(".card__like-button");
        likeButton.classList.add("card__like-button_active");
        likeCounter(item.likes.length, cardElement);
      } else {
        likeCounter(item.likes.length, cardElement);
      }
      cardList.addItem(cardElement);
    }
  }, ".cards");
  cardList.render();
  console.log(userData)
  userInfo.setUserInfo(userData);
}).catch((err)=>{
  console.log(err);
})

const modalConfirmDelete = new ModalDeleteConfirmation({
  modalSelector: ".modal-delete-confirm",
  handleFormSubmit: (id, card) => {
    api.deleteCard(id).then(() => {
      card.remove();
      modalConfirmDelete.close();
    }).catch((err)=>{
      console.log(err);
    });
  }
})
modalConfirmDelete.setEventListeners();
function getNewCardElement(item) {
  const card = new Card({
    object: item,
    templateSelector: ".card-template",
    handleCardClick: () => {
      modalImage.open(item.name, item.link);
    },
    handleDeleteClick: (id, card) => {
      //handleDeleteClick
      modalConfirmDelete.open(id, card);
    },
    handleLikeClick: (id, card) => {
      //handleLikeClick
      const likeButton = card.querySelector(".card__like-button");
      if (card.querySelector(".card__like-button").classList.contains("card__like-button_active")) {
        api.removeLike(id).then((res) => {
          likeButton.classList.remove('card__like-button_active');
          likeCounter(res.likes.length, card);
        }).catch((err)=>{
          console.log(err);
        })
      } else {
        api.addLike(id).then((res) => {
          likeButton.classList.add('card__like-button_active');
          likeCounter(res.likes.length, card);
        }).catch((err)=>{
          console.log(err);
        })
      }
    }
  });
  return card.createCard();
}

function getNewCardElementWithNoBin(item) {
  const cardElement = getNewCardElement(item);
  cardElement.querySelector(".card__delete-button").classList.add("card__delete-button_disabled")
  return cardElement;
}

function likeCounter(numberOfLikes, card) {
  const targetCounterElement = card.querySelector(".card__like-count");
  targetCounterElement.textContent = numberOfLikes;
}
//validation on forms
const formEdit = document.querySelector(".modal-edit").querySelector(".form");
const formAdd = document.querySelector(".modal-add").querySelector(".form");
const formAvatarEdit = document.querySelector(".modal-avatar-edit").querySelector(".form");
const modalAddValidator = new FormValidator(defaultSettings, formAdd);
const modalEditValidator = new FormValidator(defaultSettings, formEdit);
const modalAvatarEditValidator = new FormValidator(defaultSettings, formAvatarEdit);
modalAddValidator.enableValidation();
modalEditValidator.enableValidation();
modalAvatarEditValidator.enableValidation();

//modalImage with caption on click
const modalImage = new ModalWithImage({
  modalSelector: ".modal-figure"
});
modalImage.setEventListeners();

//update userInfo on server when submitting modal edit form
const modalEdit = new ModalWithForm({
  modalSelector: ".modal-edit",
  handleFormSubmit: (inputValues, form) => {
    renderLoading(form, true);
    api.updateUserInfo(inputValues).then((res) => {
      userInfo.setUserInfo(res);
      modalEdit.close()
    }).catch((err)=>{
      console.log(err);
    }).finally(() => {
      renderLoading(form, false)
    });
  }
});
modalEdit.setEventListeners();

function renderLoading(form, isLoading) {
  const submitButton = form.querySelector(".form__save-button")
  if (isLoading) {
    submitButton.textContent = "Saving...";
  } else {
    submitButton.textContent = "Save"
  }
}

//userInfo appearing in edit form when editButton is clicked
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener('click', () => {
  fillEditModal(userInfo.getUserInfo());
  modalEdit.open();
});

function fillEditModal(userInfo) {
  formName.value = userInfo.name;
  formInfo.value = userInfo.about;
}

//post a new card to server when submitting modalAdd form
const modalAdd = new ModalWithForm({
  modalSelector: ".modal-add",
  handleFormSubmit: (item) => {
    api.postCard(item).then((data) => {
      const cardElement = getNewCardElement(data);
      cardList.prepend(cardElement);
      modalAdd.close()
    }).catch((err)=>{
      console.log(err);
    });

  }
});
modalAdd.setEventListeners();

//updating avatar photo in server when submitting avatar edit form
const modalAvatarEdit = new ModalWithForm({
  modalSelector: ".modal-avatar-edit",
  handleFormSubmit: (item, form) => {
    renderLoading(form, true);
    api.updateUserAvatar(item.avatar).then((res) => {
      profileAvatar.src = res.avatar;
      modalAvatarEdit.close()
    }).catch((err)=>{
      console.log(err);
    }).finally(() => {
      renderLoading(form, false)
    });
}});
modalAvatarEdit.setEventListeners();
const avatarEditButton = document.querySelector(".profile__avatar-edit");
avatarEditButton.addEventListener("click", () => { modalAvatarEdit.open(); });

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => { modalAdd.open(); });
