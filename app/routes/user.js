import express from "express";
import WishlistController from "../controllers/WishlistController";
import CartController from "../controllers/CartController";
const UserRouter = express.Router();

UserRouter.get("/wishlist", WishlistController.index);
UserRouter.post("/wishlist", WishlistController.create);
UserRouter.delete("/wishlist", WishlistController.delete);

UserRouter.get("/cart", CartController.index);
UserRouter.post("/cart", CartController.create);
UserRouter.delete("/cart", CartController.delete);

export default UserRouter;
