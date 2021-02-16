import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {openModal, closeByEsc, closeModal} from "./utils.js";
import { openFigureModal} from "./Card.js"
import initialCards from "./initialCards.js";

const defaultSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled"
}
const modalEdit = document.querySelector(".modal-edit");
const modalAdd = document.querySelector(".modal-add");
const formEdit = modalEdit.querySelector(".form");
const formAdd = modalAdd.querySelector(".form");

const modalAddValidator = new FormValidator(defaultSettings, formAdd);
const modalEditValidator = new FormValidator(defaultSettings, formEdit);
modalAddValidator.enableValidation();
modalEditValidator.enableValidation();



const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button")


const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__description");
const formName = modalEdit.querySelector(".form__input_type_name");
const formInfo = modalEdit.querySelector(".form__input_type_description");
const formTitle = modalAdd.querySelector(".form__input_type_title");
const formLink = modalAdd.querySelector(".form__input_type_link");
const cardsSection = document.querySelector(".cards");

initialCards.forEach((object) => {
  addCard(object);
})

function editModal() {
  openModal(modalEdit);
  formName.value = profileName.textContent;
  formInfo.value = profileInfo.textContent;
}

function saveEditModal(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileInfo.textContent = formInfo.value;
  closeModal(modalEdit);
}

function saveAddModal(evt) {
  evt.preventDefault();
  addCard({ name: formTitle.value, link: formLink.value });
  closeModal(modalAdd);
}

function addCard(object) {
  const card = new Card(object, '.card-template');
  cardsSection.prepend(card.createCard());
}

editButton.addEventListener('click', editModal);
addButton.addEventListener("click", () => openModal(modalAdd));
formEdit.addEventListener('submit', saveEditModal);
formAdd.addEventListener('submit', saveAddModal);


const modals = Array.from(document.querySelectorAll(".modal"));

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.closest(".modal__container") === null) {
      closeModal(modal);
    }
    if (evt.target.closest(".modal__close-button")) {
      closeModal(modal);
    }
  })
});

