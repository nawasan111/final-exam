import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import { UserContext } from "./_app";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = useContext(UserContext);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [myWishlisth, setMywishlist] = useState([]);

  const productsFilter = !!router.query?.q
    ? products.filter((prod) => String(prod.name).includes(router.query.q))
    : products.filter((prod) => Number(prod.stock) > 0);

  async function onWishlist(id, isRemove = false) {
    if (isRemove) {
    } else {
      let response = await axios.post(
        "/api/u/wishlist",
        { id },
        { headers: { token: user.value.token } }
      );
      console.log(response.data);
    }
  FetchWishlist()
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
    setMywishlist(response.data.wishlists);
  };

  useEffect(() => {
    FetchProduct();
    FetchWishlist();

    console.log(myWishlisth);
    console.log();
  }, [user]);
  return (
    <>
      <Head>
        <title>OpenShop</title>
      </Head>
      <div>
        <div className="mx-auto text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 max-w-[1520px]">
          {productsFilter.map((prod, idx) => (
            <ProductCard
              key={idx}
              isFav={
                !!myWishlisth.filter(
                  (wish) => wish.product_id === Number(prod.id)
                ).length
              }
              product={prod}
              favHandler={() =>
                onWishlist(
                  prod.id,
                  !!myWishlisth.filter(
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
