const express = require('express');
const {
  httpUpdateTodo,
  httpGetTodoById,
  httpDeleteTodo,
  httpGetAllTodos,
  httpCreateTodo,
} = require('../controllers/todos.controller');
const { TodoSchema } = require('../middlewares/validators/joi-schemas');
const joiMiddlware = require('../middlewares/validators/joi.middlware');

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

ToDosRouter.route('/')
  .get(httpGetAllTodos)
  .post(joiMiddlware(TodoSchema), httpCreateTodo);

ToDosRouter.route('/:id')
  .get(httpGetTodoById)
  .patch(joiMiddlware(TodoSchema), httpUpdateTodo)
  .delete(httpDeleteTodo)
  .all((err, req, res, next) => {
    next(err);
  });

module.exports = ToDosRouter;
