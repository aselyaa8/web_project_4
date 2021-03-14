export default class UserInfo {
  constructor(profileName, profileInfo, profileAvatar) {

    this._profileName = profileName;
    this._profileInfo = profileInfo;
    this._profileAvatar = profileAvatar;
  }
  getUserInfo() {
    const formData = { name: this._profileName.textContent, about: this._profileInfo.textContent, avatar: this._profileAvatar.src};
    return formData;
  }
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileInfo.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }
}

