import mongoose from "mongoose";
import { IUser } from "./types/user";

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deletedAt: { type: Date, default: null },

},
{timestamps: true, versionKey: false}
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
