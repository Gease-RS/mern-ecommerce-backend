import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

dotenv.config();

export const createAccessToken = (user: any) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
};

export const createRefreshToken = (user: any) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });
};
