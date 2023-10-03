import { Request, Response } from "express";
import db from "../models/prismaClient";

const OrderController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    try {
      const order = await db.order.findMany({
        where: { user_id: Number(req.user.id) },
      });
      res.json(order)
    } catch (err) {
      res.json({ status: 100, message: "server found some error" });
    }
  },
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async create(req, res) {
    try {
      const { address, sending } = req.body;
      let cart = await db.cart.findMany({
        where: { user_id: Number(req.user.id) },
      });
      if (!cart.length || !address || !sending) throw 200;

      let total_price = 0;
      const cartProduct = [];
      for (let i = 0; i < cart.length; i++) {
        let getpd = await db.product.findFirst({
          where: { id: Number(cart[i].product_id) },
        });
        getpd.real_price = getpd.price - getpd.price * (getpd.discount / 100);
        total_price += getpd.real_price;
        cartProduct.push(getpd);
      }

      //   return res.json({ cartProduct, total_price });
      const order = await db.order.create({
        data: {
          user_id: Number(req.user.id),
          total_price: Number(total_price),
          product_count: cart.length,
          //   ****
          address: address,
          // ****
          shipping_price: sending,
          pay_status: 0,
          send_status: 0,
        },
      });

      const orderDetail = [];
      for (let i = 0; i < cartProduct.length; i++) {
        orderDetail.push({
          count: 1,
          order_id: order.id,
          product_discount: cartProduct[i].discount,
          product_id: cartProduct[i].id,
          product_price: cartProduct[i].price,
          user_id: Number(req.user.id),
        });
      }
      await db.order_detail.createMany({
        data: orderDetail,
      });
      await db.cart.deleteMany({ where: { user_id: Number(req.user.id) } });
      await db.user.update({
        data: { address },
        where: { id: Number(req.user.id) },
      });
      await db.$disconnect();
      res.json({ status: 201, message: "create order success" });
    } catch (err) {
      console.log(err);
      res.json({ status: 200, message: "server error with some error" });
    }
  },
};

export default OrderController;
