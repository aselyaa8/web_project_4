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

initialCards.forEach((object)=>{
  const cardTemplate = document.querySelector(".card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = object.link;
  cardElement.querySelector(".card__text").textContent = object.name;
  const cardsSection = document.querySelector(".cards");
  cardsSection.prepend(cardElement);
})


const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const likeButton = document.querySelectorAll(".like-button");
const modalEdit = document.querySelector(".modal-edit");
const profileName = document.querySelector(".profile__name");
const formName = modalEdit.querySelector(".form__input_type_name");
const profileInfo = document.querySelector(".profile__description");
const formInfo = modalEdit.querySelector(".form__input_type_description");
const saveButton = modalEdit.querySelector(".form__save-button");



function openEditModal() {
  modalEdit.classList.add('modal_opened');
  formName.value = profileName.textContent;
  formInfo.value = profileInfo.textContent;
  const closeButton = modalEdit.querySelector(".modal__close-button");
  closeButton.addEventListener("click", () => {modalEdit.classList.remove("modal_opened");})

}

function openAddModal() {
  const modalAdd = document.querySelector(".modal-add");
  modalAdd.classList.add("modal_opened");
  const closeButton = modalAdd.querySelector(".modal__close-button");
  closeButton.addEventListener("click", () => {modalAdd.classList.remove("modal_opened");})
}

editButton.addEventListener('click', openEditModal);
addButton.addEventListener("click", openAddModal);
saveButton.addEventListener('submit', e => {
  e.preventDefault();

  profileName.textContent = formName.value;
  profileInfo.textContent = formInfo.value;

});




// function saveEditModal(evt) {
//   evt.preventDefault();
//   profileName.textContent = formName.value;
//   profileInfo.textContent = formInfo.value;
//   closeEdit();
// }

// function openEditModal(){
  // const modalEdit = document.querySelector(".modal-edit");
  // modalEdit.classList.add("modal_opened");
  // const closeButton = modalEdit.querySelector(".modal__close-button");
  // closeButton.addEventListener("click", () => {modalEdit.classList.remove("modal_opened");})
  // const saveButton = modalEdit.querySelector(".form__save-button");
  // saveButton.addEventListener("click", () => {

  //   const editNameInput = modalEdit.querySelector(".form__input_type_name");
  //   const editDescInput = modalEdit.querySelector(".form__input_type_description");
  //   const name = document.querySelector(".profile__name");
  //   const desc = document.querySelector(".profile__description");
  //   console.log(editNameInput.value);

  //   name.textContent  = editNameInput.value;
  //   desc.textContent = editDescInput.value;
  // });
// }




// function openEditModal(){
//   const modalEdit = document.querySelector(".modal-edit");
//   modalEdit.classList.add("modal_opened");

//   editNameInput.value = name.textContent;
//   editDescInput.value = desc.textContent;
// }

// function closeEditModal() {
//   modalEdit.classList.remove("modal_opened");
// }

//  function saveEditModal(evt) {

//   evt.preventDefault();

//   name.textContent  = editNameInput.value;
//   desc.textContent = editDescInput.value;
//  }









