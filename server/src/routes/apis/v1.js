const express = require('express');
const ToDosRouter = require('../todos.router');

const v1Router = express.Router();

v1Router.use('/todos', ToDosRouter);

module.exports = v1Router;
