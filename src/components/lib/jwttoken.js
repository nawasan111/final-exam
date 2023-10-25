import jwt from "jsonwebtoken";
/**
 *
 * @param {{id: number, name: string, email: string, phone: string, photo: string, username: string  }} data
 */
export const JwtGenerate = (data) => {
  let token = jwt.sign(data, process.env.JWT_TOKEN, {
    algorithm: "HS256",
    expiresIn: "2d",
  });
  return token;
};

export const JwtCheck = (token) => {
  return jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) return { status: false };
    return { status: true, data: decoded };
  });
};
