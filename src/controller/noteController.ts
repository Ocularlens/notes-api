import { NextFunction, Request, Response } from "express";
import * as core from "express-serve-static-core";
import { NoteService } from "../services";

interface NoteRequest {
  text: string;
}

interface NotePath extends core.ParamsDictionary {
  id: string;
}

export const retrieveNotes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({ notes: NoteService.findAll() });
};

export const retrieveNote = (
  req: Request<NotePath>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  return res.json({ ...NoteService.findById(+id) });
};

export const createNote = (
  req: Request<{}, {}, NoteRequest>,
  res: Response,
  next: NextFunction
) => {
  const { text } = req.body as NoteRequest;
  const note = NoteService.create(text);
  const url =
    req.protocol + "://" + req.get("host") + req.originalUrl + note.id;
  res.location(url);
  return res.status(201).send();
};

export const updateNote = (
  req: Request<NotePath, {}, NoteRequest>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { text } = req.body;
  NoteService.updateById(+id, text);
  return res.status(200).send();
};

export const deleteNote = (
  req: Request<NotePath>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  NoteService.deleteById(+id);
  return res.status(200).send();
};
