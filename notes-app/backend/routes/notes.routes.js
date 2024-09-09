import express from "express";
import auth from "../middlewares/auth.middlewares.js";
import { Notes } from "../models/notes.models.js";

const router = express.Router();

// GET : / -> This will be a personalised fetch call to the server
router.get("/", auth, async (req, res) => {
  const notes = await Notes.find({ user: req.id });
  res.status(200).json({ message: "Authorised path", notes: notes });
});

// POST : /
router.post("/", auth, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const user = req.id;
    // Create a new note instance but do not save it immediately
    const note = new Notes({ title, content, tags, user });

    // Save the note to the database
    await note.save();

    // Return success response
    return res.status(200).json({ message: "Note created successfully", note });
  } catch (error) {
    // Handle errors and return error response
    return res
      .status(400)
      .json({ message: "Failed to create a note!", error: error.message });
  }
});

// PUT : /
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json("ID not fetched!");
  }
  const user = req.id;
  const { title, content, tags } = req.body;

  try {
    const note = await Notes.findOneAndUpdate({ _id: id, user },{ title, content, tags, user },{ new: true, runValidators: true });

    if (!note) {
      return res.status(400).json("Note not found!");
    }
    return res
      .status(200)
      .json({ message: "Note updated successfully", note: note });
  } catch (error) {
    console.log("Error : " + error.message)
    return res
      .status(500)
      .json({ message: "Something went wrong, failed to update the note!" });
  }
});


// DELETE /:id 
router.delete("/:id",auth,async(req,res)=>{
    const {id} = req.params;

    if(!id){
        return res.status(400).json("ID not fetched!");   
    }
    const user = req.id;
  const { title, content, tags } = req.body;

  try {
    const note = await Notes.findOneAndDelete({ _id: id, user },{ title, content, tags, user },{ new: true, runValidators: true });

    if (!note) {
      return res.status(400).json("Note not found!");
    }
    return res
      .status(200)
      .json({ message: "Note deleted successfully"});
  } catch (error) {
    console.log("Error : " + error.message)
    return res
      .status(500)
      .json({ message: "Something went wrong, failed to update the note!" });
  }
})


export { router };
