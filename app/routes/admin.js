import express from "express";
import AdminUserController from "../controllers/AdminUserController";
import AdminProductController from "../controllers/AdminProductController";
const adminRouter = express.Router();


adminRouter.get('/user', AdminUserController.index)
adminRouter.post('/product', AdminProductController.create)

export default adminRouter;
