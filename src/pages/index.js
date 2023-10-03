import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import { UserContext, WishlistContext } from "./_app";
import PopupAlert from "@/components/PopupAlert";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = useContext(UserContext);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ message: "", error: false });
  const wishlist = useContext(WishlistContext);

  const productsFilter = !!router.query?.q
    ? products.filter((prod) => String(prod.name).includes(router.query.q))
    : products.filter((prod) => Number(prod.stock) > 0);

  async function onCart(id, isRemove = false) {
    if (!user.value?.token) {
      setMessage({ message: "คุณยังไม่ได้เข้าสู่ระบบ", error: true });
      setTimeout(() => {
        setMessage({ message: "", error: true });
      }, 2000);
      return;
    }
    if (isRemove) {
    } else {
      let response = await axios.post(
        "/api/u/cart",
        { id },
        { headers: { token: user.value.token } }
      );
      console.log(response.data);
    }
  }

  async function onWishlist(id, isRemove = false) {
    if (!user.value?.token) {
      setMessage({ message: "คุณยังไม่ได้เข้าสู่ระบบ", error: true });
      setTimeout(() => {
        setMessage({ message: "", error: true });
      }, 2000);
      return;
    }
    if (isRemove) {
      let response = await axios.delete(`/api/u/wishlist?id=${id}`, {
        headers: { token: user.value.token },
      });
      console.log(response.data);
    } else {
      let response = await axios.post(
        "/api/u/wishlist",
        { id },
        { headers: { token: user.value.token } }
      );
    }
    FetchWishlist();
  }

  const FetchProduct = async () => {
    let response = await axios.get("/api/product");
    setProducts(response.data);
  };

  const FetchWishlist = async () => {
    if (!user.value?.token) return;
    let response = await axios.get("/api/u/wishlist", {
      headers: { token: user.value.token },
    });
    wishlist.set(response.data.wishlists);
  };

  useEffect(() => {
    FetchProduct();
  }, [user]);
  return (
    <>
      <Head>
        <title>OpenShop</title>
      </Head>
      <PopupAlert
        open={!!message.message.length}
        isError={message.error}
        message={message.message}
      />
      <div>
        <div className="mx-auto text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 max-w-[1520px]">
          {productsFilter.map((prod, idx) => (
            <ProductCard
              key={idx}
              isFav={
                !!wishlist.value.filter(
                  (wish) => wish.product_id === Number(prod.id)
                ).length
              }
              product={prod}
              cartHandler={() => onCart(prod.id)}
              favHandler={() =>
                onWishlist(
                  prod.id,
                  !!wishlist.value.filter(
                    (wish) => wish.product_id === Number(prod.id)
                  ).length
                )
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
