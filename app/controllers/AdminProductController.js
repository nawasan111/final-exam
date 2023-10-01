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
        err
      });
    }
  },

}

export default AdminProductController;