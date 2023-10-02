import express from "express";
import WishlistController from "../controllers/WishlistController";
const UserRouter = express.Router();

UserRouter.get("/wishlist", WishlistController.index);
UserRouter.post("/wishlist", WishlistController.create);
UserRouter.delete("/wishlist", WishlistController.delete);

export default UserRouter;
