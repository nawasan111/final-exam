import { Request, Response } from "express";
import { JwtCheck } from "@/components/lib/jwttoken";
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const JwtAdminMiddleware = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) throw 403;
    let verify = JwtCheck(token);
    if (!verify.data.rank) throw 403;
    next();
  } catch (err) {
    return res.status(403).json({
      status: 403,
      message: "access denined",
    });
  }
};

export const JwtUserMiddleware = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) throw 403;
    let verify = JwtCheck(token);
    req.user = verify.data;
    next();
  } catch (err) {
    return res.status(403).json({
      status: 403,
      message: "access denined",
    });
  }
};
