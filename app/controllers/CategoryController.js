import { Request, Response } from "express";
import db from "../models/prismaClient";
const CategoryController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    let category = await db.category.findMany({ orderBy: { id: "asc" } });
    await db.$disconnect();
    res.json(category);
  },
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async create(req, res) {
    try {
      const { name } = req.body;
      let check_cate = await db.category.findFirst({ where: { name } });
      if (check_cate) throw 202;
      await db.category.create({ data: { name } });
      return res.json({ status: 201, message: "create success" });
    } catch (err) {
      if (err === 202)
        return res.json({
          status: 202,
          message: "this category has already used",
        });
      else {
        res.json({ status: 200, message: "some error on server" });
      }
    }
  },
};

export default CategoryController;
