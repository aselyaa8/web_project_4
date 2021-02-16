const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEsc);
}
const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened")
    closeModal(openedModal);
  }
}
const closeModal = (modal) => {
  document.removeEventListener("keydown", closeByEsc);
  modal.classList.remove("modal_opened");
}
export {openModal, closeByEsc, closeModal};
