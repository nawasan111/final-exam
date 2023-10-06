import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import { CartContext, UserContext, WishlistContext } from "./_app";
import PopupAlert from "@/components/PopupAlert";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = useContext(UserContext);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ message: "", error: false });
  const wishlist = useContext(WishlistContext);
  const cart = useContext(CartContext);
  const [category, setCategory] = useState(-1);
  const [categoryList, setCategoryList] = useState([]);

  const productsFilter =
    !!router.query?.q && router.query?.q?.length
      ? products.filter(
          (prod) =>
            (category === -1 || category === prod.cateId) &&
            String(prod.name)
              .toLocaleLowerCase()
              .includes(String(router.query.q).toLocaleLowerCase()) &&
            Number(prod.stock) > 0
        )
      : products.filter(
          (prod) =>
            (category === -1 || category === prod.cateId) &&
            Number(prod.stock) > 0
        );

  async function onCart(id, isRemove = false) {
    if (!user.value?.token) {
      setMessage({ message: "คุณยังไม่ได้เข้าสู่ระบบ", error: true });
      setTimeout(() => {
        setMessage({ message: "", error: true });
      }, 2000);
      return;
    }
    if (isRemove) {
      let response = await axios.delete(`/api/u/cart?id=${id}`, {
        headers: { token: user.value.token },
      });
    } else {
      let response = await axios.post(
        "/api/u/cart",
        { id },
        { headers: { token: user.value.token } }
      );
    }
    cart.fetch();
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
    } else {
      let response = await axios.post(
        "/api/u/wishlist",
        { id },
        { headers: { token: user.value.token } }
      );
    }
    FetchWishlist();
  }

  const fetchCategory = async () => {
    try {
      let response = await axios.get("/api/category");
      setCategoryList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

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
    fetchCategory();
    FetchProduct();
  }, [user]);
  useEffect(() => {
    if (router.query?.cat) {
      setCategory(Number(router.query.cat));
    } else {
      setCategory(-1);
    }
  }, [router]);
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
        <Box className="flex justify-start mb-3 px-10 max-w-[1520px] mx-auto">
         <Box sx={{ display: "flex", overflowX: "scroll", maxWidth: "100vw" }}>
            <Button
              variant={category === -1 ? "contained" : "text"}
              className={`${category === -1 ? "" : "bg-white"} mx-1`}
              onClick={() => {
                let que = router.query;
                delete que.cat;
                router.push({
                  pathname: location.pathname,
                  query: { ...que },
                });
              }}
            >
              ทั้งหมด
            </Button>
            {categoryList.map((cat, idx) => (
              <Button
                className={`${cat.id === category ? "" : "bg-white"} mx-1`}
                variant={cat.id === category ? "contained" : "text"}
                key={idx}
                onClick={() => {
                  if (cat.id === category) {
                    let que = router.query;
                    delete que.cat;
                    router.push({
                      pathname: location.pathname,
                      query: { ...que },
                    });
                  } else {
                    router.push({
                      pathname: location.pathname,
                      query: { ...router.query, cat: cat.id },
                    });
                  }
                }}
              >
                {cat.name}
              </Button>
            ))}
          </Box>
        </Box>

        {productsFilter.length ? (
          <div className="mx-auto text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 max-w-[1520px]">
            {productsFilter.map((prod, idx) => (
              <ProductCard
                key={idx}
                isFav={
                  !!wishlist.value.filter(
                    (wish) => wish.product_id === Number(prod.id)
                  ).length
                }
                isCart={
                  !!cart.value.filter((ct) => ct.product_id === Number(prod.id))
                    .length
                }
                product={prod}
                cartHandler={() =>
                  onCart(
                    prod.id,
                    !!cart.value.filter(
                      (ct) => ct.product_id === Number(prod.id)
                    ).length
                  )
                }
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
        ) : (
          <Paper sx={{ p: 2, textAlign: "center" }}>ไม่พบรายการ</Paper>
        )}
      </div>
    </>
  );
}
