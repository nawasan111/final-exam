import { Request, Response } from "express";
import { SHA1 } from "crypto-js";
import db from "../models/prismaClient";

const UserController = {
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
};

export default UserController;
