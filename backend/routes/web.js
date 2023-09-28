import express from "express";
import WelcomeController from "../controllers/WelcomeController";
const route = express.Router();

route.get("/", WelcomeController.index);

route.get("/users", (req, res) => {
  res.json({
    name: "Nawasan",
    age: 21,
  });
});

export default route;
