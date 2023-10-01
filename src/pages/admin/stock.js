import { AddShoppingCart } from "@mui/icons-material";
import AddProduct from "@/components/AddProduct";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
export default function Stock() {
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get("/api/product").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, [modal]);
  useEffect(() => {
    axios.get("/api/category").then((res) => {
      setCategory(res.data);
    });
  }, []);

  return (
    <>
    <Head>
      <title>รายการสินค้า | admin</title>
    </Head>
    <Box>
      <Box sx={{ mb: 2, textAlign: "right" }}>
        <Button onClick={() => setModal(!modal)}>
          <AddShoppingCart />
          เพิ่มสินค้า
        </Button>
      </Box>
      {products.map((product, idx) => (
        <Card
          sx={{ m: 1, px: 1, width: 300, height: 500, display: "inline-block" }}
        >
          <Box sx={{ px: 1 }}>
            <h5 className="h-[40px] overflow-y-hidden">{product.name}</h5>
          </Box>
          <CardMedia
            className="rounded"
            component={"img"}
            height={150}
            image={product.image.length ? product.image : "/empty.jpg"}
          />
          <CardContent sx={{ px: 1 }}>
            <Typography
              sx={{ height: 70, overflowY: "scroll" }}
              variant="body2"
              color={"text.secondary"}
            >
              {product.detail}
            </Typography>
            <Table sx={{ m: 0, p: 0 }}>
              <TableBody>
                <TableRow sx={{ m: 0, p: 0 }}>
                  <TableCell sx={{ m: 0, p: 0, textAlign: "center  " }}>
                    {Number(product.price).toLocaleString() + " บาท"}
                  </TableCell>
                  <TableCell> {`ส่วนลด ${product.discount}%`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>เข้าชม {product.watch_count} ครั้ง</TableCell>
                  <TableCell>คงเหลือ {product.stock} ชิ้น</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardActions disableSpacing sx={{ justifyContent: "end" }}>
            <Button color="warning">
              <Edit /> แก้ไข
            </Button>
            <Button color="error">
              <Delete /> ลบ
            </Button>
          </CardActions>
        </Card>
      ))}
      <AddProduct open={modal} handleClose={() => setModal(false)} />
    </Box>
    </>
  );
}
