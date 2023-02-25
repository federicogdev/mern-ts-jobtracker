import bcrypt from "bcryptjs";
import UserModel from "../models/user-model";
import checkIsValidObjectID from "../util/check-is-valid-object-id";
import { IUserType, IUserSchema } from "../types/user-types";

interface IRegisterResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  token: string;
}

export const registerUser = async (
  user: IUserType
): Promise<IRegisterResponse> => {
  const { email, password, firstName, lastName, location } = user;

  if (!email) {
    throw new Error("Email required.");
  }

  if (!password) {
    throw new Error("Password required.");
  }

  if (!firstName) {
    throw new Error("FirstName required.");
  }

  if (!lastName) {
    throw new Error("LastName required.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      location,
    });

    return {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      location: newUser.location,
      token: "i",
    };
  } catch (error) {
    throw new Error("User not creatd.");
  }
};
