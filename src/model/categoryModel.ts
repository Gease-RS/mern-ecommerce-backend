import mongoose, { Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
}

const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
