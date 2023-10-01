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
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    try {
      const { id, name } = req.body;
      console.log(id, name);
      await db.category.update({ where: { id }, data: { name } });
      await db.$disconnect();
      res.json({ status: 301, message: "update success" });
    } catch (err) {
      console.log(err);
      res.json({ status: 300, message: "error can't update" });
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
      await db.category.delete({ where: { id: Number(id) } });
      await db.$disconnect();
      res.json({
        status: 401, 
        message: "delete success"
      })
    } catch (err) {
      res.json({ status: 400, message: "server has some error" });
    }
  },
};

export default CategoryController;
