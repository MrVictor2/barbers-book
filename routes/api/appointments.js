const express = require('express');
const router = express.Router();
const appointmentController = require('../../src/controllers/api/appointments');

// GET /api/appointments (get all appointments for a user)
router.get('/', appointmentController.getAppointments);

// POST /api/appointments (create a new appointment)
router.post('/', appointmentController.createAppointment);

module.exports = router;
