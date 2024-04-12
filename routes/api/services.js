const express = require('express');
const router = express.Router();
const serviceController = require('../../src/controllers/api/services');

// GET /api/services (get all services)
router.get('/', serviceController.getAllServices);

// GET /api/services/:id (get service by ID)
router.get('/:id', serviceController.getServiceById);

module.exports = router;
