import { Request, Response } from "express";
import db from "../models/prismaClient";
const AdminUserController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    let userAll = await db.user.findMany();
    db.$disconnect();
    res.json(userAll);
  },
};

export default AdminUserController;
