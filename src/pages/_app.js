import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createContext, useState, useEffect } from "react";
import UserLayout from "@/components/layout/UserLayout";
import userCookie from "@/components/lib/userCookie";
import AdminLayout from "@/components/layout/AdminLayout";
import { usePathname } from "next/navigation";
// axios.defaults.baseURL = ""

export const UserContext = createContext(null);

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({});
  const pathname = usePathname()

  useEffect(() => {
    const usrcookie = new userCookie();
    let token = usrcookie.token.split(".")[1];
    if (token) {
      let user_info = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
      user_info.token = usrcookie.token;
      setUser(user_info);
    }
  }, []);

  return (
    <UserContext.Provider value={{ value: user, set: setUser }}>
      {(user.rank && pathname.split("/")[1] === 'admin') ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <UserLayout>
          <Component {...pageProps} />
        </UserLayout>
      )}
    </UserContext.Provider>
  );
}
