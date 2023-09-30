import express from "express";
import WelcomeController from "../controllers/WelcomeController";
import UserController from "../controllers/UserController";
const route = express.Router();

route.get("/", WelcomeController.index);

route.post("/user/auth", UserController.login);
route.post("/user", UserController.create);
route.get("/user", (req, res) => {
  res.json({
    name: "Nawasan",
    age: 21,
  });
});

export default route;
