const express = require('express');
const router = express.Router();
const usersCtrl = require('../../src/controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post('/signup', usersCtrl.create);
router.post('/login', usersCtrl.login);

// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// GET /api/users?type=:type (fetch users by type)
router.get('/', ensureLoggedIn, usersCtrl.getByType); // This line should be added

router.get('/:id', ensureLoggedIn, usersCtrl.getUserById);

module.exports = router;
