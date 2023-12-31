import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { OrderContext, UserContext } from "./_app";
import axios from "axios";
import PopupAlert from "@/components/PopupAlert";
import Head from "next/head";
import Link from "next/link";
import ConfirmPayment from "@/components/order/ConfirmPayment";
import { useRouter } from "next/router";

export default function Order() {
  const user = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ error: false, message: "" });
  const order = useContext(OrderContext);
  const [payment, setPayment] = useState({ open: false, id: -1, price: -1 });
  const [payFilter, setPayFilter] = useState(false);
  const router = useRouter();

  const fetchProduct = async () => {
    try {
      let product = await axios.get("/api/product");
      setProducts(product.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <Head>
        <title>คำสั่งซื้อ | OpenShop</title>
      </Head>
      {payment.open && (
        <ConfirmPayment
          open={payment.open}
          handleClose={() => {
            setPayment({ open: false, id: -1 });
            order.fetch();
          }}
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
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Box sx={{ pb: 2 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"end"}
            >
              {order.value?.length ? (
                <Button
                  onClick={() => setPayFilter(!payFilter)}
                  variant={payFilter ? "contained" : "text"}
                >
                  ดูรายกายที่ยังไม่ชำระเงิน
                </Button>
              ) : (
                ""
              )}
            </Stack>
          </Box>
          <Paper className="shadow-none" sx={{ p: 2, overflowX: "scroll" }}>
            {order.value?.length > 0 ? (
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
                    {order.value.map(
                      (order, idx) =>
                        order &&
                        (!router.query?.q ||
                          Number(router.query.q) === order.id) &&
                        (!payFilter || order.pay_status === 0) && (
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
                            <TableCell>${order.shipping_price}</TableCell>
                            <TableCell sx={{minWidth: 70}}>
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
                            <TableCell sx={{minWidth: 70}}>
                              {order.send_status == 0 ? (
                                <Box color="gray">
                                  {order.send_status
                                    ? "ส่งแล้ว"
                                    : "ยังไม่จัดส่ง"}
                                </Box>
                              ) : (
                                <>
                                  {order.send_status == 1 ? (
                                    <Box color="orangered">กำลังจัดส่ง</Box>
                                  ) : (
                                    <Box color="green">จัดส่งแล้ว</Box>
                                  )}
                                </>
                              )}
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
      </Box>
    </>
  );
}
