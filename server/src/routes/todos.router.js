const express = require('express');
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
} = require('../controllers/todos.controller');

const ToDosRouter = express.Router();

/**
 * ToDos Routes
 * 
    GET    /todos
    POST   /todos
    GET    /todos/1 
    PUT    /todos/1
    PATCH  /todos/1
    DELETE /todos/1
 */

ToDosRouter.route('/').get(getAllTodos).post(createTodo);

ToDosRouter.route('/:id')
  .get(getTodoById)
  .put(updateTodo)
  .delete(deleteTodo)
  .all((err, req, res, next) => {
    next(err);
  });

module.exports = ToDosRouter;
