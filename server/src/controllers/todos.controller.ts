import { NextFunction, Request, Response } from 'express';
import { all } from 'ramda';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../models/todo.model';
import { isValidPaginationQueryParam } from '../services/query';

const httpGetAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, page } = req.query;
    if (all(isValidPaginationQueryParam)([String(limit), String(page)])) {
      return res.status(200).json(
        await getAllTodos({
          limit: +(limit as string),
          page: +(page as string),
        })
      );
    }
    next({
      message: 'Invalid query params',
      status: 400,
    });
    return;
  } catch (error) {
    next({ message: 'Error occurred while fetching todos', status: 400 });
    return;
  }
};
const httpGetTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await getTodoById(+req.params.id);
    return res.status(200).json(todo);
  } catch (error) {
    next({
      ...new Error(
        `Error occurred while fetching todo with id ${req.params.id}. ${
          (error as Error).message
        }`
      ),
      status: 400,
    });
    return;
  }
};

const httpCreateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const created = await createTodo(req.body);
    return res.status(201).json(created);
  } catch (error) {
    next({
      ...new Error(
        `Error occurred while creating todo. ${(error as Error).message}`
      ),
      status: 400,
    });
    return;
  }
};
const httpUpdateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await updateTodo(+req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    next({
      ...new Error(
        `Error occurred while updating todo. ${(error as Error).message}`
      ),
      status: 400,
    });
    return;
  }
};
const httpDeleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await deleteTodo(+req.params.id);
    return res.status(200).json(deleted);
  } catch (error) {
    next({
      ...new Error(
        `Error occurred while deleting todo with id ${req.params.id}.${
          (error as Error).message
        }`
      ),
      status: 400,
    });
    return;
  }
};

export {
  httpGetAllTodos,
  httpGetTodoById,
  httpCreateTodo,
  httpUpdateTodo,
  httpDeleteTodo,
};
