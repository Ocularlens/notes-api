import { NextFunction, Request, Response } from "express";
import { ApiError } from "./ApiError";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  throw new ApiError("Resource not found", 404);
};

