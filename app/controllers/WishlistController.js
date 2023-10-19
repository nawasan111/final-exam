import { Request, Response } from "express";
import db from "../models/prismaClient";
const WishlistController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    try {
      const wishlists = await db.wishlist.findMany({
        where: { user_id: req.user.id },
      });
      await db.$disconnect();
      res.json({ status: 101, wishlists });
    } catch (err) {
      console.log(err);
      res.json({ status: 100, message: "found some error" });
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
      const check = await db.wishlist.findFirst({
        where: {
          AND: { user_id: req.user.id, product_id: id },
        },
      });
      if (check) throw 200;
      await db.wishlist.create({
        data: {
          user_id: req.user.id,
          product_id: id,
        },
      });
      res.json({ status: 201, message: "add wishlist success" });
    } catch (err) {
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
      const wishlist_find = await db.wishlist.findFirst({
        where: {
          product_id: id,
          user_id: req.user.id,
        },
      });
      if (!wishlist_find) throw 400;
      await db.wishlist.delete({ where: { id: wishlist_find.id } });
      await db.$disconnect();
      res.json({ status: 401, message: "remove fav success" });
    } catch (err) {
      res.json({ status: 400, message: "remove fav failed with error" });
    }
  },
};

export default WishlistController;
