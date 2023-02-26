import bcrypt from "bcryptjs";
import UserModel from "../models/user-model";
import checkIsValidObjectID from "../util/check-is-valid-object-id";
import { IUserType, IUserSchema, IUserReturnType } from "../types/user-types";
import { generateToken } from "../util/generate-token";
import HttpException from "../util/http-exception";

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
    throw new Error("Username required.");
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

export const loginUser = async (
  email: string,
  password: string
): Promise<IUserReturnType> => {
  if (!email) {
    throw new Error("Email required.");
  }

  if (!password) {
    throw new Error("Password required.");
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new Error("Password is invalid.");
    }

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      location: user.location,
      token: generateToken({ _id: user._id }),
    };
  } catch (error) {
    throw new Error("User not found.");
  }
};
