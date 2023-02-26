import { NextFunction, Response, Request } from "express";
import asyncHandler from "express-async-handler";
import { IUserType, IUserReturnType } from "../types/user-types";
import { verifyToken } from "../util/verify-token";
import HttpException from "../util/http-exception";
import UserModel from "../models/user-model";

export interface IGetUserAuthInfoRequest extends Request {
  user?: IUserType;
}

export interface IAuthorizedUserRequest extends Request {
  user?: IUserReturnType;
}

export const isAuth = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    if (
      req.headers.authorization === null ||
      req.headers.authorization === "" ||
      req.headers.authorization === undefined ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      throw new HttpException("Unauthorized", 401);
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await UserModel.findById(decoded._id);

    if (!user) {
      throw new HttpException("User not found", 404);
    }

    req.user = user;
    next();
  }
);
