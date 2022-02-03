import { Request, Response } from "express";
import User from "../model";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  } else {
    const passwordHash = bcrypt.genSaltSync(10);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      role,
    });
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      return res.status(201).json({
        message: "User created successfully",
        user,
      });
    });
  }
};

export default createUser;
