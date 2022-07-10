import express from "express";
import { NotesStore } from "../app.mjs";

export const notesRouter = express.Router();

notesRouter.get("/add", (req, res, next) => {
  res.render("noteedit", {
    title: "Add Note",
    id: "",
    note: undefined,
    isCreate: true,
  });
});

notesRouter.get("/view", async (req, res, next) => {
  try {
    const { id } = req.query;
    const note = await NotesStore.readById(id);

    res.render("noteview", {
      title: note ? note.header : "",
      id,
      note,
    });
  } catch (err) {
    next(err);
  }
});

notesRouter.get("/edit", async (req, res, next) => {
  try {
    const { id } = req.query;
    const note = await NotesStore.readById(id);
    const title = note ? `Edit ${note.header}` : "Add Note";

    res.render("noteedit", {
      title,
      id,
      note: note,
      isCreate: false,
    });
  } catch (err) {
    next(err);
  }
});

notesRouter.get("/delete", async (req, res, next) => {
  try {
    const { id } = req.query;
    const note = await NotesStore.readById(id);
    const title = note ? note.title : "";

    res.render("notedelete", {
      title,
      id,
      note,
    });
  } catch (err) {
    next(err);
  }
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

notesRouter.post("/delete/confirm", async (req, res, next) => {
  try {
    const { id } = req.body;
    await NotesStore.deleteById(id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});
