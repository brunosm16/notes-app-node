import { default as express } from "express";
import { NotesStore as notes } from "../app.mjs";

export const indexRouter = express.Router();

indexRouter.get("/", async (req, res, next) => {
  try {
    const ids = await notes.getIds();
    const notesPromises = await ids.map((id) => notes.readById(id));
    const notesList = Promise.all(notesPromises);

    res.render("index", { title: "Notes app", notesList: notesList });
  } catch (error) {
    next(error);
  }
});
