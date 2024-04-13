const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/checkToken'))

const port = process.env.PORT || 3001;

// API routes for users
app.use('/api/users', require('./routes/api/users'));

// API routes for notes
app.use('/api/notes', require('./routes/api/notes'));

// API routes for services
app.use('/api/services', require('./routes/api/services'));

// API routes for appointments
app.use('/api/appointments', require('./routes/api/appointments')); // Add this line

// Catch all route to serve index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});