import { Request, Response } from "express";
import db from "../models/prismaClient";

const AdminOrderController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    try {
      let order = await db.order.findMany({ orderBy: { id: "desc" } });
      res.json(order);
    } catch (err) {
      res.status(403).json({ status: 403, message: "error something" });
    }
  },
};

export default AdminOrderController;
