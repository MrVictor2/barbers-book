const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const Service = require('../../models/service'); 

module.exports = {
  create,
  login,
  checkToken,
  getByType,
  getUserById 
};

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function create(req, res) {
  try {
    const { name, email, password, type } = req.body;

    // Create the user
    const user = await User.create({ name, email, password, type });

    // If user type is barber, add default services
    if (type === 'barber') {
      // Fetch default services from the "services" collection
      const defaultServices = await Service.find({});
      
      // Map the default services to their IDs
      const defaultServiceIds = defaultServices.map(service => service._id);

      // Assign the defaultServiceIds array to the user's services property
      user.services = defaultServiceIds;
      
      // Save the user with the initialized services collection
      await user.save();
    }

    // Generate JWT token for the user
    const token = createJWT(user);
    // Return token as JSON response
    res.json(token);
  } catch (err) {
    // If there's an error, return a 400 status code with the error message
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    // Add the user to the db
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).json({error: 'User not found'});
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if(!passwordMatch) return res.status(403).json({error: "Password doesn't match"});
    const token = createJWT(user);
    res.json(token);
  } catch (error) {
    console.log(error);
    // If there's an error, return a 400 status code with the error message
    res.status(400).json('error');
  }
}

async function getByType(req, res) {
  try {
    const { type } = req.query;
    const users = await User.find({ type });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users by type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}
