const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const ToDosRouter = require('./routes/todos.router');
const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/todos', ToDosRouter);
app.use((err, req, res, next) => {
  console.log('Error received here');
  return res.status(err.status).json({
    message: err.message,
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
