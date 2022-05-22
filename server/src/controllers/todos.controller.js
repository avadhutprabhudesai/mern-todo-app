const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../models/todos.model');

const httpGetAllTodos = async (req, res, next) => {
  try {
    return res.status(200).json(await getAllTodos());
  } catch (error) {
    let err = new Error(`Error occurred while fetching todos`);
    err.status = 400;
    next(err);
  }
};
const httpGetTodoById = async (req, res, next) => {
  try {
    const todo = await getTodoById(+req.params.id);
    return res.status(200).json(todo);
  } catch (error) {
    let err = new Error(
      `Error occurred while fetching todo with id ${req.params.id}. ${error.message}`
    );
    err.status = 400;
    next(err);
  }
};

const httpCreateTodo = async (req, res, next) => {
  try {
    const created = await createTodo(req.body);
    return res.status(201).json(created);
  } catch (error) {
    let err = new Error(`Error occurred while creating todo. ${error.message}`);
    err.status = 400;
    next(err);
  }
};
const httpUpdateTodo = async (req, res, next) => {
  try {
    const updated = await updateTodo(+req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    let err = new Error(`Error occurred while updating todo. ${error.message}`);
    err.status = 400;
    next(err);
  }
};
const httpDeleteTodo = async (req, res, next) => {
  try {
    const deleted = await deleteTodo(+req.params.id);
    return res.status(200).json(deleted);
  } catch (error) {
    let err = new Error(
      `Error occurred while deleting todo with id ${req.params.id}.${error.message}`
    );
    err.status = 400;
    next(err);
  }
};

module.exports = {
  httpGetAllTodos,
  httpGetTodoById,
  httpCreateTodo,
  httpUpdateTodo,
  httpDeleteTodo,
};
