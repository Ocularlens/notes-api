import { NextFunction, Request, Response } from "express";
import { NoteService } from "../services";

export const retrieveNotes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ notes: NoteService.findAll() });
};

export const retrieveNote = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  res.json({ ...NoteService.findById(+id) });
};
