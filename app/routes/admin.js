import express from "express";
import AdminUserController from "../controllers/AdminUserController";
import AdminProductController from "../controllers/AdminProductController";
import CategoryController from "../controllers/CategoryController";
import AdminOrderController from "../controllers/AdminOrderController";
const adminRouter = express.Router();

adminRouter.get("/user", AdminUserController.index);
adminRouter.delete("/user", AdminUserController.delete);
adminRouter.put("/user/rank", AdminUserController.chageRank);

adminRouter.post("/product", AdminProductController.create);
adminRouter.put("/product", AdminProductController.update);
adminRouter.delete("/product", AdminProductController.delete);

adminRouter.post("/category", CategoryController.create);
adminRouter.put("/category", CategoryController.update);
adminRouter.delete("/category", CategoryController.delete);

adminRouter.get("/order", AdminOrderController.index);
adminRouter.put("/order/sending", AdminOrderController.sending);

export default adminRouter;
