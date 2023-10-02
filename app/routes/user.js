import express from "express";
import WishlistController from "../controllers/WishlistController";
const UserRouter = express.Router();

UserRouter.get("/wishlist", WishlistController.index);
UserRouter.post("/wishlist", WishlistController.create);

export default UserRouter;
