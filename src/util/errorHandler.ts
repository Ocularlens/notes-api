import { NextFunction, Request, Response } from "express";
import { ApiError } from "./ApiError";

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  res
    .status(error.statusCode)
    .json({ statusCode: error.statusCode, message: error.message });
};
