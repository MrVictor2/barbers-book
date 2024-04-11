const express = require('express');
const router = express.Router();
const notesController = require('../../src/controllers/api/notes');

// GET /api/notes
router.get('/', notesController.getNotes);

// POST /api/notes
router.post('/', notesController.createNote);

module.exports = router;