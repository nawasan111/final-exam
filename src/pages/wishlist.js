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
import { UserContext, WishlistContext } from "./_app";
import { useRouter } from "next/router";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import { ShoppingCart } from "@mui/icons-material";
import PopupAlert from "@/components/PopupAlert";

export default function Wishlist() {
  const user = useContext(UserContext);
  const wishlist = useContext(WishlistContext);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ error: false, message: "" });
  const router = useRouter();
  const [wishlistProduct, setWishlistProduct] = useState([]);

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
    console.log(wishlist.value);
    setWishlistProduct(
      wishlist.value.map(
        (wish) => products.filter((pd) => pd.id === wish.product_id)[0]
      )
    );
  }, [wishlist, products]);

  return (
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
                      <TableCell>{pdt.price}</TableCell>
                      <TableCell>
                        <Button color="warning">
                          <ShoppingCart />
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
          <div className="text-center">รายการว่างเปล่า</div>
        )}
      </Paper>
    </Box>
  );
}
