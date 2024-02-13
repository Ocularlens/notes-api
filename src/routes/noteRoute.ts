import { Router } from "express";
import { createNote, deleteNote, retrieveNote, retrieveNotes, updateNote } from "../controller";
import { bodyValidator } from "../middlewares";
import { addNoteSchema } from "../schema";

export const noteRoute = Router();

noteRoute.get("/", retrieveNotes);
noteRoute.get("/:id", retrieveNote);
noteRoute.post("/", bodyValidator(addNoteSchema), createNote);
noteRoute.put("/:id", bodyValidator(addNoteSchema), updateNote);
noteRoute.delete("/:id", deleteNote);
