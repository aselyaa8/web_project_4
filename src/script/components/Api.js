// Token: 1700817e-a1e9-4638-acf5-4cd690372eaf
// Group ID: group-9

export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      method: "GET",
      headers: this.headers
    }).then((res)=>{
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }).catch((err)=>{
      console.log(err);
    })

  }
  updateUserInfo({name, about}){
    console.log(name, about);
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about
       })
    }).then((res)=>{
      if(res.ok){
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`);
    }).catch((err)=>{
      console.log(err);
    })
  }
  updateUserAvatar(avatar){
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar
       })
    }).then((res)=>{
      if(res.ok){
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`);
    }).catch((err)=>{
      console.log(err);
    })
  }

  getInitialCards() {
    return fetch(this.baseUrl + "/cards", {
      method: "GET",
      headers: this.headers
    }).then((res)=>{
      if(res.ok){
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`);
    }).catch((err)=>{
      console.log(err);
    })
  }
  postCard(card){
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      body: JSON.stringify({
        name: card.name,
        link: card.link
       }),
      headers: this.headers
    }).then((res)=>{
      if(res.ok){
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`);
    }).catch((err)=>{
      console.log(err);
    })
  }
  deleteCard(cardId){
    return fetch(this.baseUrl + "/cards/"+ cardId, {
      method: "DELETE",
      headers: this.headers
    }).then((res)=>{
      if(res.ok){
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`);
    }).catch((err)=>{
      console.log(err);
    })
  }


  // other methods for working with the API
}




