const Todo = require('./todo.mongo');

async function getAllTodos() {
  const todosResponse = await Todo.find({});
  return todosResponse;
}

async function getTodoById(id) {
  const todo = await Todo.findOne({ id });
  if (todo == null) {
    let err = new Error(`No todo was found with id ${id}`);
    err.status = 400;
    throw err;
  }
  return todo;
}

async function getLatestId() {
  const latestTodo = await Todo.findOne().sort('-id');
  if (!latestTodo) {
    return 0;
  }
  return latestTodo.id;
}

async function createTodo(todo) {
  const latestId = await getLatestId();
  const todoEntry = new Todo({ ...todo, id: latestId + 1 });
  const saved = await todoEntry.save();
  return saved;
}

async function updateTodo(id, update) {
  const updated = await Todo.findOneAndUpdate({ id }, update, { new: true });
  if (!updated) {
    let err = new Error(`No todo was found with id ${id}`);
    err.status = 400;
    throw err;
  }
  return updated;
}

async function deleteTodo(id) {
  const deleted = await Todo.findOneAndDelete({ id });
  if (deleted === null) {
    let err = new Error(`No todo was found with id ${id}`);
    err.status = 400;
    throw err;
  }
  return deleted;
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
