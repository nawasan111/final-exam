import Cookies from "js-cookie";
class userCookie {
  token = "";
  constructor() {
    this.token = Cookies.get("token") ?? "";
  }
  isLogin() {
    return !!this.token;
  }
  store(token) {
    Cookies.set("token", token, { expires: 1 });
  }
  delete() {
    Cookies.remove("token");
  }
}

export default userCookie;
