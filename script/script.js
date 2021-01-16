let edit = document.querySelector(".edit-button");
let closeButton = document.querySelector(".close-button");
let modalToggle = document.querySelector(".modal");
let saveButton = document.querySelector(".save-button");
let likeButton = document.querySelectorAll(".like-button");

function openEdit() {
  modalToggle.classList.add('modal_opened');
  let profileName = document.querySelector(".profile__name");
  let formName = document.querySelector(".form__input_name");
  formName.value = profileName.textContent;
  let profileInfo = document.querySelector(".profile__description");
  let formInfo = document.querySelector(".form__input_description");
  formInfo.value = profileInfo.textContent;
}

function closeEdit() {
  modalToggle.classList.remove('modal_opened');
}

function saveForm() {
  let profileName = document.querySelector(".profile__name");
  let formName = document.querySelector(".form__input_name");
  profileName.textContent = formName.value;
  let profileInfo = document.querySelector(".profile__description");
  let formInfo = document.querySelector(".form__input_description");
  profileInfo.textContent = formInfo.value;
  closeEdit();
}

function likeToggle(i) {
  parseInt(i);
  if (likeButton[i].classList.contains("like-button_disabled")) {
    likeButton[i].classList.remove("like-button_disabled");
    likeButton[i].classList.add("like-button_active");
  } else {
    likeButton[i].classList.remove("like-button_active");
    likeButton[i].classList.add("like-button_disabled");
  }
}

edit.addEventListener('click', openEdit);
closeButton.addEventListener('click', closeEdit);
saveButton.addEventListener('click', saveForm);

