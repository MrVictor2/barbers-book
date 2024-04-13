const Appointment = require('../../models/appointment');

exports.getAppointments = async (req, res) => {
  try {
    const userId = req.user._id;
    const appointments = await Appointment.find({ customer: userId });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  const { barber, services, appointmentDate } = req.body;
  const customerId = req.user._id; 

  const appointment = new Appointment({
    barber,
    services,
    appointmentDate,
    customer: customerId
  });
  
  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};