import { Request, Response } from "express";

const WelcomeController = {
  /**
   *
   * @param { Request } req
   * @param { Response } res
   */
  index(req, res) {
    res.json({
      message: "welcome to my api",
    });
  },
};

export default WelcomeController;
