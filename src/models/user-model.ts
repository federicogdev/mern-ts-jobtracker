import { Schema, model } from "mongoose";
import { IUserSchema, IUserType } from "../types/user-types";
import { emailRegex } from "../util/email-regex";

const userSchema = new Schema<IUserType>(
  {
    username: {
      type: String,
      required: [true, "First Name is required."],
      min: [3, "First Name must be at least 6 characters."],
      max: [20, "First Name must be less than 20 characters."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      min: [3, "Email must be at least 6 characters."],
      max: [50, "Email must be less than 50 characters."],
      match: [emailRegex, "Please add a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [6, "Password must be at least 6 characters"],
      max: [50, "Password must be less than 50 characters"],
      select: false,
    },
    location: {
      type: String,
      default: "Unknown",
      trim: true,
    },
  },
  { timestamps: true }
);

const UserModel = model<IUserSchema>("User", userSchema);

export default UserModel;
