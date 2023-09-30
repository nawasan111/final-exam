import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createContext, useState, useEffect } from "react";
import UserLayout from "@/components/layout/UserLayout";
// axios.defaults.baseURL = ""

export const UserContext = createContext(null);

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ value: user, set: setUser }}>
      <UserLayout>
        <Component {...pageProps} />
      </UserLayout>
    </UserContext.Provider>
  );
}
