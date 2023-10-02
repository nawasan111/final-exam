import express from "express";
import WelcomeController from "../controllers/WelcomeController";
import UserController from "../controllers/UserController";
import adminRouter from "./admin";
import { JwtAdminMiddleware, JwtUserMiddleware } from "./middleware";
import CategoryController from "../controllers/CategoryController";
import ProductController from "../controllers/ProductController";
import UserRouter from "./user";
const route = express.Router();

route.use("/admin/", JwtAdminMiddleware, adminRouter);
route.use("/u/",JwtUserMiddleware, UserRouter);
route.get("/", WelcomeController.index);
route.get("/user", UserController.index);
route.post("/user/auth", UserController.login);
route.post("/user", UserController.create);
route.get("/category", CategoryController.index);
route.get("/product", ProductController.index);

export default route;
