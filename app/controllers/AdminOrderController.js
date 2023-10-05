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
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async sending(req, res) {
    try {
      const { id, sending } = req.body;
      if (!id) throw 300;
      await db.order.update({
        where: { id: Number(id) },
        data: { send_status: Number(sending) },
      });
      await db.$disconnect();
      res.json({ status: 301, message: "update sending success" });
    } catch (err) {
      console.log(err);
      res.json({ status: 300, message: "Error with server" });
    }
  },
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async detail(req, res) {
    try {
      const { id } = req.query;
      let orderdetail = await db.order_detail.findMany({
        where: { order_id: Number(id) },
      });
      res.json(orderdetail);
    } catch (err) {
      res.status(403).json({ status: 100, message: "found error on server" });
    }
  },
};

export default AdminOrderController;
