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
  CircularProgress,
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
  const [products, setProducts] = useState({});
  const [message, setMessage] = useState({ message: "", error: false });
  const wishlist = useContext(WishlistContext);
  const cart = useContext(CartContext);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [algorithm, setAlgorithm] = useState([]);

  useEffect(() => {
    if (!algorithm.length) {
      // sort positions with keys of product
      let seed = [...Object.keys(products)];
      let productRandom = [];
      while (seed.length) {
        let point = Math.floor(Math.random() * seed.length);
        productRandom.push(seed[point]);
        seed.splice(point, 1);
      }
      setAlgorithm(productRandom);
    }
  }, [products]);

  useEffect(() => {
    // products filter for search and category
    let cat_id = category.length
      ? categoryList.filter((c) => c.name == category)[0]?.id ?? ""
      : "";
    let product_cache =
      !!router.query?.q && router.query?.q?.length
        ? algorithm.filter(
            (pid) =>
              (category.length === 0 || cat_id === products[pid].cateId) &&
              String(products[pid].name)
                .toLocaleLowerCase()
                .includes(String(router.query.q).toLocaleLowerCase()) &&
              Number(products[pid].stock) > 0
          )
        : algorithm.filter(
            (pid) =>
              (category.length === 0 || cat_id === products[pid]?.cateId) &&
              Number(products[pid].stock) > 0
          );
    setProductsFilter(product_cache);
  }, [products, category, algorithm]);

  // for user click cart button
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

  // for user click wishlist button
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
    let pd = {};
    response.data.map((e) => (pd[e.id] = e));
    setProducts(pd);
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
      setCategory(router.query.cat);
    } else if (category !== -1) {
      setCategory("");
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
        <Box className="flex justify-start mb-3 sm:px-10 max-w-[1520px] mx-auto">
          <Box sx={{ display: "flex", overflowX: "scroll" }}>
            <Button
              variant={category.length === 0 ? "contained" : "text"}
              className={`${category.length === 0 ? "" : "bg-white"} mx-1`}
              onClick={() => {
                let que = router.query;
                delete que.cat;
                router.push({
                  pathname: location.pathname,
                  query: { ...que },
                });
              }}
            >
              ทั้งหมด{category.length === 0 ? `(${productsFilter.length})` : ""}
            </Button>
            {categoryList.map((cat, idx) => (
              <Button
                className={`${cat.name === category ? "" : "bg-white"} mx-1`}
                variant={cat.name === category ? "contained" : "text"}
                key={idx}
                onClick={() => {
                  if (cat.name === category) {
                    let que = router.query;
                    delete que.cat;
                    router.push({
                      pathname: location.pathname,
                      query: { ...que },
                    });
                  } else {
                    router.push({
                      pathname: location.pathname,
                      query: { ...router.query, cat: cat.name },
                    });
                  }
                }}
              >
                {cat.name}
                {cat.name === category ? `(${productsFilter.length})` : ""}
              </Button>
            ))}
          </Box>
        </Box>

        {productsFilter.length ? (
          <div className="mx-auto text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 max-w-[1520px]">
            {productsFilter.map((pid, idx) => (
              <ProductCard
                key={idx}
                isFav={
                  !!wishlist.value.filter(
                    (wish) => wish.product_id === products[pid].id
                  ).length
                }
                isCart={
                  !!cart.value.filter(
                    (ct) => ct.product_id === products[pid].id
                  ).length
                }
                product={products[pid]}
                cartHandler={() =>
                  onCart(
                    products[pid].id,
                    !!cart.value.filter(
                      (ct) => ct.product_id === products[pid].id
                    ).length
                  )
                }
                favHandler={() =>
                  onWishlist(
                    products[pid].id,
                    !!wishlist.value.filter(
                      (wish) => wish.product_id === products[pid].id
                    ).length
                  )
                }
              />
            ))}
          </div>
        ) : (
          <Paper className="max-w-[1520px] mx-auto shadow-none" sx={{ p: 2, textAlign: "center" }}>
            {algorithm.length ? "ไม่พบรายการ" : <CircularProgress />}
          </Paper>
        )}
      </div>
    </>
  );
}
