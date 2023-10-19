import { Request, Response } from "express";
import db from "../models/prismaClient";

const OrderDetailController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    try {
      const { id } = req.query;
      const orderDetail = await db.order_detail.findMany({
        where: { user_id: req.user.id, order_id: id },
      });
      await db.$disconnect();
      res.json(orderDetail);
    } catch (err) {
      res.status(403).json({ status: 100, message: "error on server" });
    }
  },
};

export default OrderDetailController;
