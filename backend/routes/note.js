/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
var Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: get API to get all user notes by user id api/notes/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    res.status(500).send("Internal server error occured");
  }
});

// ROUTE 2: get API to add notes api/notes/fetchallnotes . login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title min 3 characters").isLength({ min: 3 }),
    body("description", "enter a valid description min 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    // if there are error, return bad request with status 400
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      res.status(500).send("Internal server error occured");
    }
  }
);

// ROUTE 3: get API to update notes api/notes/updatenote:id . login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send({ error: "unable to find node for the user" });
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send({ error: "Not Allowed" });
  }

  try {
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE 3: get API to update notes api/notes/updatenote:id . login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send({ error: "unable to find node for the user" });
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send({ error: "Not Allowed" });
  }
  try {
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"SUCCESS":"Note has been deleted", note : note})
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
