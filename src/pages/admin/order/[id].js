import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/pages/_app";
import Head from "next/head";
import {
  Box,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Link from "next/link";
import { ArrowBackIos } from "@mui/icons-material";

export default function AdminOrderDetail() {
  const user = useContext(UserContext);
  const router = useRouter();
  const [orderDetailList, setOrderDetailList] = useState([]);
  const [orderDetailProduct, setOrderDetailProduct] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    let response = await axios.get("/api/product");
    setProducts(response.data);
  };

  const fetchOrderDetail = async () => {
    if (!user.value?.token) return;
    try {
      let response = await axios.get(
        "/api/admin/order/detail?id=" + router.query.id,
        {
          headers: { token: user.value.token },
        }
      );
      console.log(response.data);
      setOrderDetailList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchOrderDetail();
    setOrderDetailProduct(
      orderDetailList.map(
        (ordd) =>
          products.filter((product) => product.id === ordd.product_id)[0]
      )
    );
    console.log(orderDetailProduct);
  }, [user]);

  return (
    <>
      <Head>
        <title>รายละเอียดคำสั่งซื้อ | OpenShop</title>
      </Head>
      {orderDetailList.length ? (
        <Box>
          <Box sx={{ textAlign: "right", p: 1 }}>
            <Link href="/admin/order">
              <Button color="error">
                <ArrowBackIos /> ย้อนกลับ
              </Button>
            </Link>
          </Box>
          <Paper sx={{ p: 1, overflowX: "scroll" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {["ลำดับ", "รูปภาพ", "ชื่อสินค้า", "รายละเอียด", "ราคา"].map(
                    (label, idx) => (
                      <TableCell key={idx}>{label}</TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetailList.map((orderd, idx) => {
                  let pdt = products.filter(
                    (product) => product.id === orderd.product_id
                  )[0];
                  return (
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
                        <TableCell sx={{ minWidth: 70 }}>{pdt.name}</TableCell>
                        <TableCell>
                          <div className="max-h-10  overflow-scroll">
                            {pdt.detail}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Box color="orangered">${orderd.product_price}</Box>
                        </TableCell>
                      </TableRow>
                    )
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      ) : (
        <Box>
          <Paper sx={{ p: 1 }}>
            <Box sx={{ textAlign: "center" }}>ไม่พบรายการ</Box>
          </Paper>
        </Box>
      )}
    </>
  );
}
