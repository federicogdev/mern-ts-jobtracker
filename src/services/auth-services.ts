import bcrypt from "bcryptjs";
import UserModel from "../models/user-model";
import checkIsValidObjectID from "../util/check-is-valid-object-id";
import { IUserType, IUserSchema } from "../types/user-types";
import { generateToken } from "../util/generate-token";

interface IRegisterResponse {
  _id: string;
  username: string;
  email: string;
  location: string;
  token: string;
}

export const registerUser = async (
  user: IUserType
): Promise<IRegisterResponse> => {
  const { email, password, username, location } = user;

  if (!email) {
    throw new Error("Email required.");
  }

  if (!password) {
    throw new Error("Password required.");
  }

  if (!username) {
    throw new Error("First Name required.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      location,
    });

    return {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      location: newUser.location,
      token: generateToken({ _id: newUser._id }),
    };
  } catch (error) {
    throw new Error("User not created.");
  }
};
