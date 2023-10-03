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

export default function Cart() {
  const user = useContext(UserContext);
  const wishlist = useContext(WishlistContext);
  const cart = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ error: false, message: "" });
  const router = useRouter();
  const [CartProduct, setCartProduct] = useState([]);

  const removeFromCart = async (id) => {};
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
    setCartProduct(
      cart.value.map(
        (ct) => products.filter((pd) => pd.id === ct.product_id)[0]
      )
    );
  }, [cart, products]);

  return (
    <>
      <Head>
        <title>ตระกร้าสินค้า | OpenShop</title>
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
                    "นำออกจากรายการ",
                  ].map((label, idx) => (
                    <TableCell key={idx}>{label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {CartProduct.map(
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
                            color="error"
                            onClick={() => removeFromCart(pdt.id)}
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
            <div className="text-center">รายการว่างเปล่า</div>
          )}
        </Paper>
      </Box>
    </>
  );
}
