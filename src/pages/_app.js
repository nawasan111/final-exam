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
import Error from "./_error";
import axios from "axios";
// axios.defaults.baseURL = ""

export const UserContext = createContext(null);
export const WishlistContext = createContext(null);
export const CartContext = createContext(null);
export const OrderContext = createContext(null);

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const pathname = usePathname();

  const fetchCart = async () => {
    if (!user.token) return;
    let response = await axios.get("/api/u/cart", {
      headers: { token: user.token },
    });
    if (response.data.status === 101) {
      setCart(response.data.cart);
    }
  };

  const fetchOrder = async () => {
    if (!user?.token) return;
    let response = await axios.get("/api/u/order", {
      headers: { token: user.token },
    });
    setOrder(response.data);
  };

  const fetchWishlist = async () => {
    if (!user?.token) return;
    let response = await axios.get("/api/u/wishlist", {
      headers: { token: user.token },
    });
    console.log(response.data);
    setWishlist(response.data.wishlists);
  };
  useEffect(() => {
    const usrcookie = new userCookie();
    let token = usrcookie.token.split(".")[1];
    if (token) {
      let user_info = JSON.parse(
        Buffer.from(token, "base64").toString("utf-8")
      );
      user_info.token = usrcookie.token;
      setUser(user_info);
    }
  }, []);

  useEffect(() => {
    fetchCart();
    fetchWishlist();
    fetchOrder();
  }, [user]);

  return (
    <UserContext.Provider value={{ value: user, set: setUser }}>
      <CartContext.Provider
        value={{ value: cart, set: setCart, fetch: fetchCart }}
      >
        <WishlistContext.Provider value={{ value: wishlist, set: setWishlist }}>
          <OrderContext.Provider
            value={{ value: order, set: setOrder, fetch: fetchOrder }}
          >
            {String(pathname).split("/")[1] === "admin" ? (
              <>
                {user.rank ? (
                  <AdminLayout>
                    <Component {...pageProps} />
                  </AdminLayout>
                ) : (
                  <UserLayout>
                    <Error />
                  </UserLayout>
                )}
              </>
            ) : (
              <UserLayout>
                <Component {...pageProps} />
              </UserLayout>
            )}
          </OrderContext.Provider>
        </WishlistContext.Provider>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}
