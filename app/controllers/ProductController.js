import { Request, Response } from "express";
import db from "../models/prismaClient";
const ProductController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    let product = await db.product.findMany();
    await db.$disconnect()
    res.json(product)
  },
};

export default ProductController;
