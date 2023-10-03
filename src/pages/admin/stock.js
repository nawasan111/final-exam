import { AddShoppingCart } from "@mui/icons-material";
import AddProduct from "@/components/product/AddProduct";
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
import UpdateProduct from "@/components/product/UpdateProduct";
import DeleteProduct from "@/components/product/DeleteProduct";
import { useRouter } from "next/router";

export default function Stock() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [updateState, setUpdateState] = useState({ open: false, data: {} });
  const [deleteState, setDeleteState] = useState({ open: false, id: -1 });
  const [category, setCategory] = useState([]);

  const productsFilter = !!router.query?.q
    ? products.filter((prod) => String(prod.name).includes(router.query.q))
    : products;

  useEffect(() => {
    axios.get("/api/product").then((res) => {
      setProducts(res.data);
    });
  }, [modal, updateState, deleteState]);
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
        <div className="mx-auto text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 max-w-[1520px]">
          {productsFilter.map((product, idx) => (
            <Card
              key={idx}
              sx={{
                m: 1,
                px: 1,
                width: 300,
                height: 500,
                display: "inline-block",
              }}
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
                <Button
                  color="warning"
                  onClick={() => setUpdateState({ open: true, data: product })}
                >
                  <Edit /> แก้ไข
                </Button>
                <Button
                  color="error"
                  onClick={() => setDeleteState({ open: true, id: product.id })}
                >
                  <Delete /> ลบ
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
        <AddProduct open={modal} handleClose={() => setModal(false)} />
      </Box>
      {updateState.open && (
        <UpdateProduct
          open={updateState.open}
          handleClose={() => setUpdateState({ open: false, data: {} })}
          data={updateState.data}
        />
      )}
      {deleteState.open && (
        <DeleteProduct
          open={deleteState.open}
          handleClose={() => setDeleteState({ open: false, id: -1 })}
          id={deleteState.id}
        />
      )}
    </>
  );
}
