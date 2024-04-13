const Appointment = require('../../models/appointment');

exports.getAppointments = async (req, res) => {
  try {
    const userId = req.user._id;
    const userType = req.user.type;

    let query = {};

    if (userType === 'customer') {
      // If the user is a customer, retrieve appointments where the customer ID matches
      query.customer = userId;
    } else if (userType === 'barber') {
      // If the user is a barber, retrieve appointments where the barber ID matches
      query.barber = userId;
    }

    const appointments = await Appointment.find(query);
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
