import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const bodyValidator = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      return res
        .status(400)
        .json({ message: "VALIDATION_ERROR", errors: message });
    }

    return next();
  };
};
