

// let edit = document.querySelector(".profile__edit-button");
// let closeButton = document.querySelector(".modal__close-button");
// let modalToggle = document.querySelector(".modal");
// let saveButton = document.querySelector(".form");
// let likeButton = document.querySelectorAll(".like-button");
// let profileName = document.querySelector(".profile__name");
// let formName = document.querySelector(".form__input_type_name");
// let profileInfo = document.querySelector(".profile__description");
// let formInfo = document.querySelector(".form__input_type_description");
// let addButton = document.querySelector("profile__add-button");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
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


addButton.addEventListener("click", ()=> {
  toggle();
})

addButton.addEventListener("click", toggle());


function toggle(){

}
