import express from "express";
import { NotesStore } from "../app.mjs";

export const notesRouter = express.Router();

notesRouter.get("/add", (req, res, next) => {
  res.render("noteedit", {
    title: "Add Note",
    id: "",
    note: undefined,
    isCreate: false,
  });
});

notesRouter.post("/save", async (req, res, next) => {
  try {
    const { id, header, content, isCreate } = req.body;
    const notesObj = [id, header, content];

    isCreate
      ? await NotesStore.create(...notesObj)
      : await NotesStore.update(...notesObj);

    res.redirect(`/notes/view?id=${id}`);
  } catch (err) {
    next(err);
  }
});
