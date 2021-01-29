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
const formEdit = modalEdit.querySelector(".form");
const formAdd = modalAdd.querySelector(".form");
const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__image-caption");
const cardsSection = document.querySelector(".cards");

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
}

function addModal() {
  toggleModal(modalAdd);
}

function openFigureModal(object) {
  console.log(object);
  toggleModal(modalFigure);
  modalImage.src = object.link;
  modalImage.alt = object.name;
  modalCaption.textContent = object.name;
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

function createCard(object) {
  const cardTemplate = document.querySelector(".card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text")
  cardText.textContent = object.name;
  cardImage.src = object.link;
  cardImage.alt = object.name;
  cardImage.addEventListener("click", () => {
    openFigureModal(object);
  });
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  deleteCardButton.addEventListener("click", () => { cardElement.remove() });
  cardElement.querySelector(".card__like-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  })
  return cardElement;
}

function addCard(object){
  const cardElement = createCard(object);
  cardsSection.prepend(cardElement);
}


editButton.addEventListener('click', editModal);
addButton.addEventListener("click", addModal);
const closeEditModal = modalEdit.querySelector(".modal__close-button");
closeEditModal.addEventListener("click", () => { toggleModal(modalEdit) })
const closeAddModal = modalAdd.querySelector(".modal__close-button");
closeAddModal.addEventListener("click", () => { toggleModal(modalAdd) })
const closeFigureModal = modalFigure.querySelector(".modal__close-button");
closeFigureModal.addEventListener("click", () => { toggleModal(modalFigure) })
formEdit.addEventListener('submit', saveEditModal);
formAdd.addEventListener('submit', saveAddModal);








