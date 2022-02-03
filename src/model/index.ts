import { Schema, model } from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
  role: number;
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0 },
});

export default model<User>("User", schema);
