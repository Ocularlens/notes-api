import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { Note } from "../models";
import { ApiError } from "../util";

const FILE_PATH = path.join(__dirname, "..", "..", "data", "notes.json");

export class NoteService {
  static findAll(): Note[] {
    try {
      const file = readFileSync(FILE_PATH);
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
  static create(text: string): Note {
    const notes = NoteService.findAll();

    const id = notes.length === 0 ? 1 : notes[notes.length - 1].id + 1;

    const newNote: Note = {
      id,
      text,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    notes.push(newNote);

    NoteService.saveToFile(notes);

    return newNote;
  }
  static findById(id: number): Note {
    const notes = NoteService.findAll();
    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) throw new ApiError("Note not found", 404);

    return notes[index];
  }
  static updateById(id: number, text: string): void {
    NoteService.findById(id);

    const notes = NoteService.findAll();
    const newNotes: Note[] = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          text,
          updatedDate: new Date(),
        };
      }

      return note;
    });

    NoteService.saveToFile(newNotes);
    return;
  }
  static deleteById(id: number): void {
    NoteService.findById(id);

    const notes = NoteService.findAll();
    const index = notes.findIndex((note) => note.id === id);

    notes.splice(index, 1);

    NoteService.saveToFile(notes);
    return;
  }
  static saveToFile(notes: Note[]): void {
    const str = JSON.stringify(notes, null, 2);
    writeFileSync(FILE_PATH, str);
  }
}
