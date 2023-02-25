import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import * as AuthServices from "../services/auth-services";

export const login = expressAsyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Login" });
  }
);

export const register = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const createdUser = await AuthServices.registerUser(req.body);

    res.status(202).json({ data: createdUser });
  }
);
