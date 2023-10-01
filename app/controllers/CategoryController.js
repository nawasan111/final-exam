import { Request, Response } from "express";
import db from "../models/prismaClient";
const CategoryController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    let category = await db.category.findMany({orderBy: {id: "asc"}});
    await db.$disconnect();
    res.json(category);
  },
};

export default CategoryController;
