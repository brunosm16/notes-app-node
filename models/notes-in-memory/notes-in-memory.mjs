import { Note } from "../domain/Notes.mjs";
import { NotesStore } from "../interfaces/notes-store.mjs";

const notes = [];

export class NotesInMemory extends NotesStore {
  async create(id, header, content) {
    notes[id] = new Note(id, header, content);
  }

  async update(id, header, content) {
    notes[id] = new Note(id, header, content);
  }

  async readById(id) {
    if (notes[id]) return notes[id];
    else throw new Error(`Note '${id}' doesn't exist`);
  }

  async destroyById(id) {
    if (notes[id]) delete notes[id];
    else throw new Error(`Note '${id}' doesn't exist`);
  }

  async getIds() {
    return Object.keys(notes).map(id => id);
  }

  async count() {
    if (notes) notes.length;
    else throw new Error(`Notes doesn't exists`);
  }
}
