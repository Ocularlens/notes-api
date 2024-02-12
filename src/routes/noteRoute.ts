import { Router } from "express";
import { retrieveNote, retrieveNotes } from "../controller";

export const noteRoute = Router();

noteRoute.get("/", retrieveNotes);
noteRoute.get('/:id', retrieveNote);
