import mongoose, { Schema, Document } from "mongoose";
import { IUser, UserRole } from "../interfaces/IUser";

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [UserRole.USER, UserRole.ADMIN],
      default: UserRole.USER,
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("user", userSchema);

export default User;
