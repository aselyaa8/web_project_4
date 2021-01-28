const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  }

];
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button")
const modalEdit = document.querySelector(".modal-edit");
const modalAdd = document.querySelector(".modal-add");
const modalFigure = document.querySelector(".modal-figure");
const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__description");
const formName = modalEdit.querySelector(".form__input_type_name");
const formInfo = modalEdit.querySelector(".form__input_type_description");
const formTitle = modalAdd.querySelector(".form__input_type_title");
const formLink = modalAdd.querySelector(".form__input_type_link");

initialCards.forEach((object) => {
  addCard(object);
})

function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
}

function editModal() {
  toggleModal(modalEdit);
  formName.value = profileName.textContent;
  formInfo.value = profileInfo.textContent;
  const formEdit = modalEdit.querySelector(".form");
  formEdit.addEventListener('submit', saveEditModal);
}

function addModal() {
  toggleModal(modalAdd);
  const formAdd = modalAdd.querySelector(".form");
  formAdd.addEventListener('submit', saveAddModal);
}

function openFigureModal(evt) {
  toggleModal(modalFigure);
  const modalImage = document.querySelector(".modal__image");
  const modalCaption = document.querySelector(".modal__image-caption");
  modalImage.src = evt.target.src;
  modalCaption.textContent = evt.target.nextElementSibling.textContent;
}

function saveEditModal(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileInfo.textContent = formInfo.value;
  toggleModal(modalEdit);
}

function saveAddModal(evt) {
  evt.preventDefault();
  addCard({ name: formTitle.value, link: formLink.value });
  toggleModal(modalAdd);
}

function addCard(object) {
  const cardTemplate = document.querySelector(".card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = object.link;
  cardElement.querySelector(".card__text").textContent = object.name;
  const cardsSection = document.querySelector(".cards");
  cardsSection.prepend(cardElement);
  const deleteCardButton = document.querySelector(".card__delete-button");
  deleteCardButton.addEventListener("click", () => { cardElement.remove() });
  cardElement.querySelector(".card__image").addEventListener("click", openFigureModal);
  cardElement.querySelector(".card__like-button").addEventListener("click", function (evt) {

    if (evt.target.classList.contains("card__like-button_active")) {
      evt.target.classList.remove("card__like-button_active");
      evt.target.classList.add("card__like-button_disabled");
    }
    if (evt.target.classList.contains("card__like-button_disabled")) {
      evt.target.classList.remove("card__like-button_disabled");
      evt.target.classList.add("card__like-button_active");
    }
  })
}


editButton.addEventListener('click', editModal);
addButton.addEventListener("click", addModal);
const closeEditModal = modalEdit.querySelector(".modal__close-button");
closeEditModal.addEventListener("click", () => { toggleModal(modalEdit) })
const closeAddModal = modalAdd.querySelector(".modal__close-button");
closeAddModal.addEventListener("click", () => { toggleModal(modalAdd) })
const closeFigureModal = modalFigure.querySelector(".modal__close-button");
closeFigureModal.addEventListener("click", () => { toggleModal(modalFigure) })










