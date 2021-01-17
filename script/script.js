let edit = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".modal__close-button");
let modalToggle = document.querySelector(".modal");
let saveButton = document.querySelector(".form");
// let likeButton = document.querySelectorAll(".like-button");
let profileName = document.querySelector(".profile__name");
let formName = document.querySelector(".form__input_type_name");
let profileInfo = document.querySelector(".profile__description");
let formInfo = document.querySelector(".form__input_type_description");


function openEdit() {
  modalToggle.classList.add('modal_opened');
  formName.value = profileName.textContent;
  formInfo.value = profileInfo.textContent;
}

function closeEdit() {
  modalToggle.classList.remove('modal_opened');
}

function saveForm(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileInfo.textContent = formInfo.value;
  closeEdit();
}

// function likeToggle(i) {
//   parseInt(i);
//   if (likeButton[i].classList.contains("card__like-button_disabled")) {
//     likeButton[i].classList.remove("card__like-button_disabled");
//     likeButton[i].classList.add("card__like-button_active");
//   } else {
//     likeButton[i].classList.remove("card__like-button_active");
//     likeButton[i].classList.add("card__like-button_disabled");
//   }
// }

edit.addEventListener('click', openEdit);
closeButton.addEventListener('click', closeEdit);
saveButton.addEventListener('submit', saveForm);

