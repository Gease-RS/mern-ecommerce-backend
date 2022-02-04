import * as dotenv from "dotenv";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model";
import { createAccessToken, createRefreshToken } from "../auth/authToken";

dotenv.config();

export default {
  signUp: async (req: Request, res: Response) => {
    try {
      const { name, email, password, role, contactNumber, profilePicture } =
        req.body;

      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: passwordHash,
        role: role || "user" || "admin",
        contactNumber,
        profilePicture,
      });

      await newUser.save();

      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ newUser, accesstoken });

      return res.status(201).json({ msg: "User created successfully." });
    } catch (error) {
      return res.status(500).json({ err: "Something went wrong." });
    }
  },

  signIn: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ err: "Error refresh token" });
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ err: "Error logout" });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const refreshtoken = req.cookies.refreshtoken;
      if (!refreshtoken) return res.json({ msg: "No refresh token" });

      const { id } = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(id);
      if (!user) return res.json({ msg: "No user" });

      const accesstoken = createAccessToken({ id: user._id });
      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ err: "Error refresh token" });
    }
  },

  listUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find({});
      return res.json({ users });
    } catch (err) {
      return res.status(500).json({ err: "Error list users" });
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.body.user._id).select("-password");
      return res.json(user);
    } catch (err) {
      return res.status(500).json("Error get user");
    }
  },

  updateUser: async (req: Request, res: Response) => {
    const id = req.params._id;
    const { name, email, password, role, contactNumber, profilePicture } =
      req.body;
    try {
      const userUpdate = await User.updateOne(
        { _id: id },
        {
          name,
          email,
          password,
          contactNumber,
          profilePicture,
          role,
        },
        { new: true }
      );

      const user = await User.findById(id);
      res.status(200).json(user).json({ msg: "User updated successfully." });
    } catch (err) {
      return res.status(500).json("Error update user");
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    const id = req.params._id;
    try {
      const user = await User.findById(id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      await User.deleteOne({ _id: id });
      return res.json({ msg: "User deleted successfully." });
    } catch (err) {
      return res.status(500).json("Error delete user");
    }
  },

  addCart: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.body.user._id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      await User.findOneAndUpdate(
        { _id: req.body.user.id },
        {
          cart: req.body.cart,
        }
      );

      return res.json({ msg: "Added to cart" });
    } catch (err) {
      return res.status(500).json({ err: "Something went wrong." });
    }
  },
}; //END
