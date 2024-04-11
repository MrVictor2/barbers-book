const express = require('express');
const router = express.Router();
const barbersController = require('../../src/controllers/api/barbers');

// GET /api/barbers
router.get('/', barbersController.getBarbers);

// POST /api/barbers
router.post('/', barbersController.createBarbers);

module.exports = router;