const todos = require('../models/todos.model');

const getAllTodos = (req, res) => {
  return res.status(200).json(todos);
};
const getTodoById = (req, res) => {
  const todo = todos.find((t) => t.id === +req.params.id);
  if (todo == null) {
    let err = new Error(`No task was found with id ${+req.params.id}`);
    err.status = 400;
    throw err;
  }
  return res.status(200).json(todo);
};
const createTodo = (req, res) => {
  todos.push(req.body);
  return res.status(200).json(todos);
};
const updateTodo = (req, res) => {
  const updateIndex = todos.findIndex((t) => t.id === +req.params.id);
  if (updateIndex === -1) {
    return res.status(400).json({
      error: `No task was found with id ${req.params.id}`,
    });
  }
  todos.splice(updateIndex, 1, req.body);
  return res.status(200).json(todos);
};
const deleteTodo = (req, res) => {
  const deleteIndex = todos.findIndex((t) => t.id === +req.params.id);
  if (deleteIndex === -1) {
    return res.status(400).json({
      error: `No task was found with id ${req.params.id}`,
    });
  }
  todos.splice(deleteIndex, 1);
  return res.status(200).json(todos);
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
