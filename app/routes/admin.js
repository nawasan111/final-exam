import express from "express";
import AdminUserController from "../controllers/AdminUserController";
import AdminProductController from "../controllers/AdminProductController";
import CategoryController from "../controllers/CategoryController";
const adminRouter = express.Router();

adminRouter.get("/user", AdminUserController.index);
adminRouter.post("/product", AdminProductController.create);
adminRouter.post("/category", CategoryController.create);
adminRouter.put("/category", CategoryController.update);

export default adminRouter;
