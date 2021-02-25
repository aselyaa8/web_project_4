export default class UserInfo {
  constructor(profileName, profileInfo) {
    this._profileNameElement = document.querySelector(".profile__name");
    this._profileInfoElement = document.querySelector(".profile__description");
    this._profileNameElement.value = profileName;
    this._profileInfoElement.value = profileInfo;
  }
  getUserInfo() {
    const formData = { name: this._profileNameElement.value, info: this._profileInfoElement.value };
    return formData;
  }
  setUserInfo(data) {
    this._profileNameElement.textContent = data["edit-profile-name"];
    this._profileInfoElement.textContent = data["edit-profile-description"];
  }
}

