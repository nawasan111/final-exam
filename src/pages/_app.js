import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import UserLayout from "@/components/layout/UserLayout";
// axios.defaults.baseURL = ""

export default function App({ Component, pageProps }) {
  return (
    <>
      <UserLayout>
        <Component {...pageProps} />
      </UserLayout>
    </>
  );
}
