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
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async delete(req, res) {
    try {
      const { id } = req.query;
      if (!id) throw 400;
      await db.user.delete({ where: { id: Number(id) } });
      res.json({
        status: 401,
        message: "delete success",
      });
    } catch (err) {
      res.json({
        status: 400,
        message: "delete failed with some error on server",
      });
    }
  },
};

export default AdminUserController;
