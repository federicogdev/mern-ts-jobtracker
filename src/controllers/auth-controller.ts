import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as AuthServices from "../services/auth-services";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await AuthServices.loginUser(req.body.email, req.body.password);

  res.status(202).json({ data: user });
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const createdUser = await AuthServices.registerUser(req.body);

  res.status(202).json({ data: createdUser });
});
