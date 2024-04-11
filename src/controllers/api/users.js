const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login,
  checkToken
};

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
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
    if(!user) return res.status(404).json({eror:'user not found'})
    const passwordMatch = await bcrypt.compare(req.body.password, user.password)
    if(!passwordMatch) return res.status(403).json({eror:"password don't match"})
    const token = createJWT(user);
    res.json(token)
    } catch (error) {
      console.log(error)
      // If there's an error, return a 400 status code with the error message
    res.json('error');
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
