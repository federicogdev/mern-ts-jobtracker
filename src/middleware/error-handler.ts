import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";
import HttpException from "../util/http-exception";
import env from "../util/validate-env";

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    message: message,
    stack: env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
