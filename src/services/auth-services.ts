import bcrypt from "bcryptjs";
import UserModel from "../models/user-model";
import { IUserType, IUserSchema, IUserReturnType } from "../types/user-types";
import { generateToken } from "../util/generate-token";
import HttpException, { ErrorHandler } from "../util/http-exception";

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
    throw new HttpException("Email required.", 400);
  }

  if (!password) {
    throw new HttpException("Password required.", 400);
  }

  if (!username) {
    throw new HttpException("Username required.", 400);
  }

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    throw new HttpException("Email already taken.", 400);
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
    throw ErrorHandler(error);
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<IUserReturnType> => {
  if (!email) {
    throw new HttpException("Email required.", 400);
  }

  if (!password) {
    throw new HttpException("Password required.", 400);
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new HttpException("User not found", 400);
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new HttpException("Password is invalid.", 400);
    }

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      location: user.location,
      token: generateToken({ _id: user._id }),
    };
  } catch (error) {
    throw ErrorHandler(error);
  }
};
