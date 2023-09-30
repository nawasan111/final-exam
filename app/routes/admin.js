import express from "express";
import AdminUserController from "../controllers/AdminUserController";
const adminRouter = express.Router();


adminRouter.get('/user', AdminUserController.index)

export default adminRouter;
