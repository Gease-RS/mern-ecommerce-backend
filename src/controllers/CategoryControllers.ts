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

  createCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, description } = req.body;
      const categoryExists = await Category.findOne({ name });
      if (categoryExists) {
        return res.status(400).json({
          message: "Category already exists",
        });
      }
      const category = new Category({
        name,
        description,
      });
      await category.save();
      return res.json({
        message: "Category created successfully",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        petition: false,
        message: "Server error, try again later.",
      });
    }
  },
};
