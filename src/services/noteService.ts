import { readFileSync } from "fs";
import path from "path";
import { Note } from "../models";
import { ApiError } from "../util";

export class NoteService {
  static findAll(): Note[] {
    try {
      const file = readFileSync(
        path.join(__dirname, "..", "data", "notes.json")
      );
      let notesJSON: any[] = JSON.parse(file.toString());
      const notes: Note[] = notesJSON.map((note) => {
        return {
          id: note.id,
          text: note.text,
          createdDate: new Date(note.createdDate),
          updatedDate: new Date(note.updatedDate),
        };
      });
      return notes;
    } catch (error) {
      throw new ApiError("Internal Server Error", 500);
    }
  }
  // static create(): Note {}
  static findById(id: number): Note {
    const notes = NoteService.findAll();
    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) throw new ApiError("Note not found", 404);

    return notes[index];
  }
  // static updateById(id: number): Note {}
  // static deleteById(id: number): Note {}
}
