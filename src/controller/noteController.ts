import { NextFunction, Request, Response } from "express";
import { NoteService } from "../services";

export const retrieveNotes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({ notes: NoteService.findAll() });
};

export const retrieveNote = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  return res.json({ ...NoteService.findById(+id) });
};

export const createNote = (req: Request, res: Response, next: NextFunction) => {
  const { text } = req.body;
  NoteService.create(text);
  return res.status(201).send();
};
