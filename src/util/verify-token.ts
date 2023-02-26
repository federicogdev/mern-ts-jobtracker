import { IUserPayload } from "../types/jwt-types";
import JWT from "jsonwebtoken";
import env from "../util/validate-env";
import HttpException from "./http-exception";

export const verifyToken = (token: string): IUserPayload => {
  try {
    return JWT.verify(token, env.JWT_SECRET) as IUserPayload;
  } catch (error) {
    throw new HttpException("Invalid token", 401);
  }
};
