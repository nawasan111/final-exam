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
import { CartContext, UserContext } from "./_app";
import { useRouter } from "next/router";
import axios from "axios";
import PopupAlert from "@/components/PopupAlert";
import Head from "next/head";
import Link from "next/link";
import ConfirmPayment from "@/components/order/ConfirmPayment";

export default function Order() {
  const user = useContext(UserContext);
  const cart = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ error: false, message: "" });
  const [orderList, setOrderList] = useState([]);
  const [CartProduct, setCartProduct] = useState([]);
  const [payment, setPayment] = useState({ open: false, id: -1, price: -1 });

  const fetchOrder = async () => {
    if (!user.value?.token) return;
    let response = await axios.get("/api/u/order", {
      headers: { token: user.value.token },
    });
    setOrderList(response.data);
    console.log(response.data);
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
    fetchOrder();
  }, [user, payment]);

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
        <title>คำสั่งซื้อ | OpenShop</title>
      </Head>
      {payment.open && (
        <ConfirmPayment
          open={payment.open}
          handleClose={() => setPayment({ open: false, id: -1 })}
          id={payment.id}
          price={payment.price}
        />
      )}
      <Box>
        <PopupAlert
          open={!!message.message.length}
          isError={message.error}
          message={message.message}
        />
        <Paper sx={{ p: 1, overflowX: "scroll" }}>
          {orderList.length > 0 ? (
            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    {[
                      "id",
                      "ราคาทั้งหมด",
                      "รายละเอียด",
                      "จำนวนสินค้า",
                      "ค่าส่ง",
                      "ชำระเงิน",
                      "การจัดส่ง",
                    ].map((label, idx) => (
                      <TableCell key={idx}>{label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderList.map(
                    (order, idx) =>
                      order && (
                        <TableRow key={idx}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>
                            <Box color="orangered">
                              ${Number(order.total_price).toLocaleString()}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Link href={"/order/" + order.id}>
                              <Button>รายละเอียด</Button>
                            </Link>
                          </TableCell>
                          <TableCell>{order.product_count}</TableCell>
                          <TableCell>{order.shipping_price}</TableCell>
                          <TableCell>
                            <Box color={order.pay_status ? "green" : "red"}>
                              {order.pay_status ? (
                                "ชำระเงินแล้ว"
                              ) : (
                                <Button
                                  onClick={() =>
                                    setPayment({
                                      open: true,
                                      id: order.id,
                                      price: order.total_price,
                                    })
                                  }
                                >
                                  ดำเนินการชำระเงิน
                                </Button>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box color={order.send_status ? "green" : "red"}>
                              {order.send_status ? "ส่งแล้ว" : "ยังไม่จัดส่ง"}
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </Box>
          ) : (
            <div className="text-center">
              {user.value?.token
                ? "รายการว่างเปล่า"
                : "คุณยังไม่ได้เข้าสู่ระบบ"}
            </div>
          )}
        </Paper>
      </Box>
    </>
  );
}
