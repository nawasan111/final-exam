import express from "express";
import WelcomeController from "../controllers/WelcomeController";
import UserController from "../controllers/UserController";
import adminRouter from "./admin";
import { JwtAdminMiddleware } from "./middleware";
import CategoryController from "../controllers/CategoryController";
const route = express.Router();

route.use("/admin/", JwtAdminMiddleware, adminRouter);
route.get("/", WelcomeController.index);
route.get("/user", UserController.index);
route.post("/user/auth", UserController.login);
route.post("/user", UserController.create);
route.get('/category', CategoryController.index)

export default route;
