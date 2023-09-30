import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
/**
 *
 * @param {{id: number, name: string, email: string, phone: string, photo: string, username: string  }} data
 */
export const JwtGenerate = (data) => {
  let token = jwt.sign(data, process.env.JWT_TOKEN, { algorithm: "HS256" });
  return token;
};

export const JwtCheck = (token) => {
  return jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) return { status: false };
    return { status: true, data: decoded };
  });
};
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
    if (!verify.status) throw 403;
    next();
  } catch (err) {
    return res.status(403).json({
      status: 403,
      message: "access denined",
    });
  }
};
