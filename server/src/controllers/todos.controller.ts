import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
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
    return next(new createHttpError.BadRequest('Invalid query params'));
  } catch (error) {
    console.log('======httpGetAllTodos error', error);
    next(new createHttpError.InternalServerError('Error fetching todos'));
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
    if (!todo) {
      return next(new createHttpError.BadRequest('No todo found'));
    }
    return res.status(200).json(todo);
  } catch (error) {
    return next(new createHttpError.InternalServerError('Error fetching todo'));
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
    return next(new createHttpError.InternalServerError('Error creating todo'));
  }
};
const httpUpdateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await updateTodo(+req.params.id, req.body);
    if (!updated) {
      return next(new createHttpError.BadRequest('No todo found'));
    }
    return res.status(200).json(updated);
  } catch (error) {
    return next(new createHttpError.InternalServerError('Error updating todo'));
  }
};
const httpDeleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await deleteTodo(+req.params.id);
    if (!deleted) {
      return next(new createHttpError.BadRequest('No todo found'));
    }
    return res.status(200).json(deleted);
  } catch (error) {
    return next(new createHttpError.InternalServerError('Error deleting todo'));
  }
};

export {
  httpGetAllTodos,
  httpGetTodoById,
  httpCreateTodo,
  httpUpdateTodo,
  httpDeleteTodo,
};
