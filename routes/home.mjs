import { default as express } from "express";
import { NotesStore } from "../app.mjs";

export const homeRouter = express.Router();

homeRouter.get("/", async (req, res, next) => {
  try {
    const ids = await NotesStore.getIds();
    const notesPromises = await ids.map((id) => NotesStore.readById(id));
    const notesList = await Promise.all(notesPromises);

    res.render("index", { title: "Notes app", notesList: notesList });
  } catch (error) {
    next(error);
  }
});
