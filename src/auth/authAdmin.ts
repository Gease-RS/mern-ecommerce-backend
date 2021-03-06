import { NextFunction, Request, Response } from "express";
import User from "../model/userModel";

const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user.role === "admin")
      return res.status(400).json({ msg: "Invalid token" });

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default authAdmin;
