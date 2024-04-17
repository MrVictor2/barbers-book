const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  barber: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentDate: { type: Date, default: Date.now }, // Can handle both date and time
  completedDate: { type: Date },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;