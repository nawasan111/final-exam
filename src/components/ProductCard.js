import React from "react";
import {
  Box,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { FavoriteBorder } from "@mui/icons-material";
import { ShoppingCart } from "@mui/icons-material";
import { RemoveShoppingCart } from "@mui/icons-material";

export default function ProductCard({
  product,
  isFav,
  isCart,
  favHandler,
  cartHandler,
}) {
  const fav = isFav;
  const cart = isCart;

  /**
   *
   * @param {number} id
   * @param {boolean} isRemove
   */
  return (
    <div
      className="p-1 my-3 w-[300px] sm:w-[270px] xl:w-[320px] mx-auto inline-block bg-white rounded hover:shadow duration-300"
      sx={{
        m: 1,
        px: 1,
        // height: 500,
        display: "inline-block",
      }}
    >
      <CardMedia
        sx={{ pt: 1 }}
        className="rounded-lg object-contain"
        component={"img"}
        height={250}
        image={product.image.length ? product.image : "/empty.jpg"}
      />
      <CardContent sx={{ px: 1 }}>
        <Box sx={{ px: 1 }}>
          <h5 className="h-[20px] overflow-y-hidden">{product.name}</h5>
        </Box>
        <Typography
          sx={{ height: 70, overflowY: "scroll" }}
          variant="body2"
          color={"text.secondary"}
        >
          {product.detail}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ justifyContent: "space-between", px: 1 }}
      >
        <span>
          <Button
            onClick={favHandler}
            title={fav ? "ถูกใจแล้ว" : "ถูกใจ"}
            color="error"
          >
            {fav ? <Favorite /> : <FavoriteBorder />}
          </Button>
          <Button
            title={cart ? "นำออกจากตระกร้า" : "เพิ่มลงในตระกร้า"}
            color="warning"
            onClick={cartHandler}
          >
            {cart ? <RemoveShoppingCart /> : <ShoppingCart />}
          </Button>
        </span>
        {Number(product.discount) > 0 ? (
          <Box color={"orangered"}>
            <small className="px-1">
              <del>${Number(product.price).toLocaleString()}</del>
            </small>
            $
            {(
              Number(product.price) -
              Number(product.price) * (Number(product.discount) / 100)
            ).toLocaleString()}
          </Box>
        ) : (
          <Box color={"orangered"}>
            ${Number(product.price).toLocaleString()}
          </Box>
        )}
      </CardActions>
    </div>
  );
}
