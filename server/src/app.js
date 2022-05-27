const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const v1Router = require('./routes/apis/v1');
const app = express();
require('./config/passport-jwt.config');

/**
 * Middlewares
 */
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(passport.initialize());
app.use('/v1', v1Router);

app.use((err, req, res, next) => {
  console.log('Error received here', err);
  return res.status(err.status).json({
    message: err.message,
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
