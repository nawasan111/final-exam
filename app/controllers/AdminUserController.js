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
  async chageRank(req, res) {
    try {
      const { id, rank } = req.body;
      if (!id) throw 300;
      await db.user.update({
        where: { id: Number(id) },
        data: { rank: !!rank },
      });
      await db.$disconnect();
      res.json({ status: 301, message: "update rank success" });
    } catch (err) {
      res.json({ status: 300, message: "change error on server" });
    }
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
      await db.$disconnect();
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
