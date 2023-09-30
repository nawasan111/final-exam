import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createContext, useState, useEffect } from "react";
import UserLayout from "@/components/layout/UserLayout";
import userCookie from "@/components/lib/userCookie";
// axios.defaults.baseURL = ""

export const UserContext = createContext(null);

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const usrcookie = new userCookie();
    let token = usrcookie.token.split(".")[1];
    if (token) {
      let user_info = JSON.parse(atob(token));
      user_info.token = usrcookie.token;
      setUser(user_info);
      console.log(user_info);
    }
  }, []);

  return (
    <UserContext.Provider value={{ value: user, set: setUser }}>
      <UserLayout>
        <Component {...pageProps} />
      </UserLayout>
    </UserContext.Provider>
  );
}
