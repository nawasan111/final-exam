import jwt from "jsonwebtoken";
/**
 *
 * @param {{id: number, name: string, email: string, phone: string, photo: string, username: string  }} data
 */
export const JwtGenerate = (data) => {
  let token = jwt.sign(data, process.env.JWT_TOKEN, { algorithm: "HS256" });
  return token;
};
