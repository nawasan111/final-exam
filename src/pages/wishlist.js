import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CartContext, UserContext, WishlistContext } from "./_app";
import { useRouter } from "next/router";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import { ShoppingCart } from "@mui/icons-material";
import PopupAlert from "@/components/PopupAlert";
import Head from "next/head";
import { RemoveShoppingCart } from "@mui/icons-material";

export default function Wishlist() {
  const user = useContext(UserContext);
  const wishlist = useContext(WishlistContext);
  const cart = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ error: false, message: "" });
  const router = useRouter();
  const [wishlistProduct, setWishlistProduct] = useState([]);

  const isInCart = (id) => {
    return !!cart.value.filter((ct) => ct.product_id === Number(id)).length;
  };

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
      setMessage({ message: "นำออกจากตระกร้าสำเร็จ", error: false });
      setTimeout(() => {
        setMessage({ message: "", error: false });
      }, 2000);
    } else {
      let response = await axios.post(
        "/api/u/cart",
        { id },
        { headers: { token: user.value.token } }
      );
      setMessage({ message: "เพิ่มลงในตระกร้าสำเร็จ", error: false });
      setTimeout(() => {
        setMessage({ message: "", error: false });
      }, 2000);
    }
    cart.fetch();
  }

  const removeFromWishlist = async (id) => {
    try {
      let response = await axios.delete(`/api/u/wishlist?id=${id}`, {
        headers: { token: user.value.token },
      });
      fetchWishlist();
      setMessage({ message: "นำออกจากรายการแล้ว", error: false });
      setTimeout(() => {
        setMessage({ message: "", error: false });
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchWishlist = async () => {
    try {
      let response = await axios.get("/api/u/wishlist", {
        headers: { token: user.value.token },
      });
      wishlist.set(response.data.wishlists);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProduct = async () => {
    try {
      let product = await axios.get("/api/product");
      setProducts(product.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    setWishlistProduct(
      wishlist.value.map(
        (wish) => products.filter((pd) => pd.id === wish.product_id)[0]
      )
    );
  }, [wishlist, products]);

  return (
    <>
      <Head>
        <title>รายการชื่นชอบ | OpenShop</title>
      </Head>
      <Box>
        <PopupAlert
          open={!!message.message.length}
          isError={message.error}
          message={message.message}
        />
        <Paper sx={{ p: 1, overflowX: "scroll" }}>
          {wishlist.value.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "ลำดับ",
                    "รูปภาพ",
                    "ชื่อสินค้า",
                    "รายละเอียด",
                    "ราคา",
                    "เพิ่มลงตระกร้า",
                    "นำออกจากรายการ",
                  ].map((label, idx) => (
                    <TableCell key={idx}>{label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {wishlistProduct.map(
                  (pdt, idx) =>
                    pdt && (
                      <TableRow key={idx}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>
                          <img
                            width={100}
                            src={pdt.image?.length ? pdt.image : "/empty.jpg"}
                            alt="รูปสินค้า"
                          />
                        </TableCell>
                        <TableCell>{pdt.name}</TableCell>
                        <TableCell>
                          <div className="max-h-10  overflow-scroll">
                            {pdt.detail}
                          </div>
                        </TableCell>
                        <TableCell>
                          {pdt.discount > 0 ? (
                            <Box color={"orangered"}>
                              <del>${pdt.price}</del> $
                              {pdt.price - pdt.price * (pdt.discount / 100)}
                            </Box>
                          ) : (
                            <Box color="orangered">${pdt.price}</Box>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => onCart(pdt.id, isInCart(pdt.id))}
                            color="warning"
                          >
                            {isInCart(pdt.id) ? (
                              <RemoveShoppingCart />
                            ) : (
                              <ShoppingCart />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            color="error"
                            onClick={() => removeFromWishlist(pdt.id)}
                          >
                            <Delete />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center">{user.value?.token ? "รายการว่างเปล่า": "คุณยังไม่ได้เข้าสู่ระบบ"}</div>
          )}
        </Paper>
      </Box>
    </>
  );
}
