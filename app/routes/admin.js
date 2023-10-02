import express from "express";
import AdminUserController from "../controllers/AdminUserController";
import AdminProductController from "../controllers/AdminProductController";
import CategoryController from "../controllers/CategoryController";
const adminRouter = express.Router();

adminRouter.get("/user", AdminUserController.index);
adminRouter.delete("/user", AdminUserController.delete);

adminRouter.post("/product", AdminProductController.create);
adminRouter.put("/product", AdminProductController.update);
adminRouter.delete("/product", AdminProductController.delete);

adminRouter.post("/category", CategoryController.create);
adminRouter.put("/category", CategoryController.update);
adminRouter.delete("/category", CategoryController.delete);

export default adminRouter;
