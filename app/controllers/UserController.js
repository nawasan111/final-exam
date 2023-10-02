import { Request, Response } from "express";
import { SHA1 } from "crypto-js";
import db from "../models/prismaClient";
import { JwtGenerate } from "@/components/lib/jwttoken";

const UserController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    let userAll = await db.user.findMany();
    db.$disconnect();
    for (let i = 0; i < userAll.length; i++) {
      delete userAll[i].google_token;
      delete userAll[i].rank;
      delete userAll[i].password;
    }
    res.json(userAll);
  },
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async create(req, res) {
    try {
      let { name, email, phone, photo, username, password, google_token } =
        req.body;
      if (google_token) {
        // login with google
        if (!(email && photo && name)) throw "error : emty data";
        username = String(email).split("@")[0];
        phone = "";
        password = "";
      } else {
        if (!(name && email && phone && username && password))
          throw "error : emty data";
        google_token = "";
        photo = photo ?? "";
        password = SHA1(password).toString();
      }

      let checkUsername = await db.user.findFirst({
        where: { username: username },
      });
      if (checkUsername) throw 202;

      await db.user.create({
        data: {
          name,
          email,
          phone,
          address: "",
          photo,
          username,
          password,
          rank: false,
          google_token: google_token ?? "",
        },
      });
      db.$disconnect();
      res.json({
        status: 201,
        message: "success",
      });
    } catch (err) {
      if (err === 202)
        return res.json({
          status: 202,
          message: "username has already used",
        });
      console.log(err);
      res.status(200).json({
        status: 200,
        msg: "error something",
        error: err,
      });
    }
  },
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async login(req, res) {
    try {
      let { username, password } = req.body;
      if (!(username && password)) throw 202;
      password = SHA1(password).toString();
      let user = await db.user.findFirst({
        where: { AND: { username } },
      });
      if (!user) throw 203;
      if (user.password !== password) throw 203;
      let token = JwtGenerate({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        username: user.username,
        rank: user.rank,
      });
      return res.json({ status: 201, token, message: "login success" });
    } catch (err) {
      if (err === 203)
        return res.json({
          status: 203,
          message: "usrname or password is wrong",
        });
      else if (err === 202)
        res.json({ status: 202, message: "error data emty", req: req.body });
      else {
        res.json({ status: 200, err, message: "error something" });
      }
    }
  },
};

export default UserController;
