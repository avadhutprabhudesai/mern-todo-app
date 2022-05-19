const todos = [
  {
    id: 1,
    title: 'Get Milk',
    isDone: false,
  },
  {
    id: 2,
    title: 'Get eggs',
    isDone: false,
  },
];

function getAllTodos() {
  return todos;
}

function getTodoById(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo == null) {
    let err = new Error(`No task was found with id ${id}`);
    err.status = 400;
    throw err;
  }
  return todo;
}

function createTodo(todo) {
  todos.push(todo);
  return todos;
}

function updateTodo(id, update) {
  const updateIndex = todos.findIndex((t) => t.id === id);
  if (updateIndex === -1) {
    let err = new Error(`No task was found with id ${id}`);
    err.status = 400;
    throw err;
  }
  todos.splice(updateIndex, 1, { ...todos[updateIndex], ...update });
  return todos;
}

function deleteTodo(id) {
  const deleteIndex = todos.findIndex((t) => t.id === id);
  if (deleteIndex === -1) {
    let err = new Error(`No task was found with id ${id}`);
    err.status = 400;
    throw err;
  }
  todos.splice(deleteIndex, 1);
  return todos;
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
