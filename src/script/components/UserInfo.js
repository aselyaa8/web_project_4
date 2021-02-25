export default class UserInfo {
  constructor(profileName, profileInfo) {
    this._profileNameElement = document.querySelector(".profile__name");
    this._profileInfoElement = document.querySelector(".profile__description");
    this._profileName = profileName;
    this._profileInfo = profileInfo;
  }
  getUserInfo() {
    const formData = { name: this._profileName, info: this._profileInfo };
    return formData;
  }
  setUserInfo(data) {
    this._profileNameElement.textContent = data.name;
    this._profileInfoElement.textContent = data.info;
    this._profileName = data.name;
    this._profileInfo = data.info;
  }
}

