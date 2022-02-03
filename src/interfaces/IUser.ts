import { Document } from "mongoose";

enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  contactNumber: string;
  profilePicture: string;
}

export { IUser, UserRole };
