const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../models/todos.model');

const httpGetAllTodos = (req, res) => {
  return res.status(200).json(getAllTodos());
};
const httpGetTodoById = (req, res) => {
  const todo = getTodoById(+req.params.id);
  return res.status(200).json(todo);
};

const httpCreateTodo = (req, res) => {
  const todos = createTodo(req.body);
  return res.status(200).json(todos);
};
const httpUpdateTodo = (req, res) => {
  const todos = updateTodo(+req.params.id, req.body);
  return res.status(200).json(todos);
};
const httpDeleteTodo = (req, res) => {
  const todos = deleteTodo(+req.params.id);
  return res.status(200).json(todos);
};

module.exports = {
  httpGetAllTodos,
  httpGetTodoById,
  httpCreateTodo,
  httpUpdateTodo,
  httpDeleteTodo,
};
