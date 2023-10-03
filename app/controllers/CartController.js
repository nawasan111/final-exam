import { Request, Response } from "express";
import db from "../models/prismaClient";

const CartController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    try {
      let cart = await db.cart.findMany({
        where: { user_id: Number(req.user.id) },
      });
      res.json({ status: 101, message: "fetch success", cart });
    } catch (err) {
      res.json({ status: 100, message: "error on server" });
    }
  },
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async create(req, res) {
    try {
      const { id } = req.body;
      if (!id) throw 200;
      let check_cart = await db.cart.findFirst({
        where: {
          AND: { product_id: Number(id), user_id: Number(req.user.id) },
        },
      });
      if (check_cart) throw 202;
      await db.cart.create({
        data: {
          user_id: Number(req.user.id),
          product_id: Number(id),
        },
      });
      await db.$disconnect();
      res.json({ status: 201, message: "add to cart success" });
    } catch (err) {
      if (err === 202)
        return res.json({
          status: 202,
          message: "this product was added",
        });
      res.json({ status: 200, message: "found some error on server" });
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
      let check_cart = await db.cart.findFirst({
        where: {
          AND: { user_id: Number(req.user.id), product_id: Number(id) },
        },
      });
      if (!check_cart) throw 400;
      await db.cart.delete({ where: { id: check_cart.id } });
      await db.$disconnect();
      res.json({ status: 401, message: "remove success" });
    } catch (err) {
      console.log(err);
      res.json({ status: 400, message: "remove failed with error on server" });
    }
  },
};

export default CartController;
