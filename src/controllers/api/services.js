const Service = require('../../models/service');

// Controller function to fetch all services
async function getAllServices(req, res) {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to fetch a service by its ID
async function getServiceById(req, res) {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllServices,
  getServiceById,
};
