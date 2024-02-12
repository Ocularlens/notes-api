import { Router } from "express";
import { createNote, retrieveNote, retrieveNotes } from "../controller";
import { bodyValidator } from "../middlewares";
import { addNoteSchema } from "../schema";

export const noteRoute = Router();

noteRoute.get("/", retrieveNotes);
noteRoute.get("/:id", retrieveNote);
noteRoute.post("/", bodyValidator(addNoteSchema), createNote);
