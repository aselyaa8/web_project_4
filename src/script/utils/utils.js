function fillEditModal() {
  const profileName = document.querySelector(".profile__name");
  const profileInfo = document.querySelector(".profile__description");
  const modalEdit = document.querySelector(".modal-edit")
  const formName = modalEdit.querySelector(".form__input_type_name");
  const formInfo = modalEdit.querySelector(".form__input_type_description");
  formName.value = profileName.textContent;
  formInfo.value = profileInfo.textContent;
}
export default fillEditModal;
