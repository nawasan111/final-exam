import { Request, Response } from "express";
import db from "../models/prismaClient";
const AdminProductController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async create(req, res) {
    try {
      let { name, price, detail, discount, stock, image, category } = req.body;
      await db.product.create({
        data: {
          name,
          detail,
          price,
          discount: Number(discount),
          stock: Number(stock),
          image: image ?? "",
          cateId: Number(category),
          buy_count: 0,
          watch_count: 0,
        },
      });
      await db.$disconnect();
      res.json({ status: 201, message: "add product success" });
    } catch (err) {
      console.log(err);
      res.json({
        status: 200,
        message: "error in server",
        err,
      });
    }
  },
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    try {
      const { id, name, price, detail, discount, stock, image, category } =
        req.body;
      await db.product.update({
        where: { id: Number(id) },
        data: {
          name,
          price,
          detail,
          discount: Number(discount),
          stock,
          image,
          cateId: Number(category),
        },
      });
      await db.$disconnect();
      return res.json({ status: 301, message: "update success" });
    } catch (err) {
      console.log(err);
      res.json({
        status: 300,
        message: "update failed with some error on server",
      });
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
      await db.product.delete({ where: { id: Number(id) } });
      res.json({ status: 401, message: "delete success" });
    } catch (err) {
      console.log(err);
      res.json({ status: 400, message: "delete failed with some error" });
    }
  },
};

export default AdminProductController;
