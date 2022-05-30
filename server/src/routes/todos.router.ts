import express, { ErrorRequestHandler } from 'express';
import {
  httpUpdateTodo,
  httpGetTodoById,
  httpDeleteTodo,
  httpGetAllTodos,
  httpCreateTodo,
} from '../controllers/todos.controller';
import { TodoSchema } from '../middlewares/validators/joi-schemas';
import joiMiddlware from '../middlewares/validators/joi.middlware';

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

const errorHander: ErrorRequestHandler = (err, req, res, next) => {
  next(err);
};

ToDosRouter.route('/:id')
  .get(httpGetTodoById)
  .patch(joiMiddlware(TodoSchema), httpUpdateTodo)
  .delete(httpDeleteTodo)
  .all(errorHander);

export default ToDosRouter;
