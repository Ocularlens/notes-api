import { NextFunction, Request, Response } from "express";
import { ApiError } from "./ApiError";

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isProd = process.env.NODE_ENV === "production";

  console.error(error);

  res
    .status(error.statusCode)
    .json({
      statusCode: error.statusCode,
      message: error.message,
      ...(!isProd ? { stack: error.stack } : {}),
    });
};
