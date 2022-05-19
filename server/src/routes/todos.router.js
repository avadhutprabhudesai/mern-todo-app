const express = require('express');
const {
  httpUpdateTodo,
  httpGetTodoById,
  httpDeleteTodo,
  httpGetAllTodos,
  httpCreateTodo,
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

ToDosRouter.route('/').get(httpGetAllTodos).post(httpCreateTodo);

ToDosRouter.route('/:id')
  .get(httpGetTodoById)
  .patch(httpUpdateTodo)
  .delete(httpDeleteTodo)
  .all((err, req, res, next) => {
    next(err);
  });

module.exports = ToDosRouter;
