import Cookies from "js-cookie";
class userCookie {
  token = "";
  constructor() {
    this.token = Cookies.get("token") ?? "";
  }
  isLogin() {
    return !!this.token;
  }
}

export default userCookie;
