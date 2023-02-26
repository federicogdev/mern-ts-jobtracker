import { IUserPayload } from "../types/jwt-types";
import JWT from "jsonwebtoken";
import env from "../util/validate-env";

export const generateToken = (payload: IUserPayload): string => {
  return JWT.sign(payload, env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
