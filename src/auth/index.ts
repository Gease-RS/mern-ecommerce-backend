import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
      (err: any, user: any) => {
        if (err) return res.status(401).json({ msg: "Invalid token" });
      }
    );
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
