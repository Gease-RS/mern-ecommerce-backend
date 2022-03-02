import { Request, Response } from "express";
import Category from "../model/categoryModel";

export default {
  getCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      const categories = await Category.find();
      return res.json({ categories });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        petition: false,
        message: "Server error, try again later.",
      });
    }
  },
};
