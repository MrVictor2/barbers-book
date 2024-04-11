const Note = require('../../models/note');

exports.getNotes = async (req, res) => {
  try {
    // Assuming req.user contains the logged-in user's information
    const userId = req.user._id;
    const notes = await Note.find({ user: userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createNote = async (req, res) => {
  const { text } = req.body;
  const userId = req.user._id; // Assuming req.user contains the logged-in user's information

  const note = new Note({
    text,
    user: userId
  });
  
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
