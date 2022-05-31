import { getPagination } from '../services/query';
import { PaginationInput, PaginationOutput, Todo, TodoUpdate } from '../types';
import Todos from './todo.mongo';

async function getAllTodos(query: PaginationInput) {
  const { limit, skip }: PaginationOutput = getPagination(query);
  const todosResponse = await Todos.find({})
    .sort({ id: 1 })
    .skip(skip)
    .limit(limit);
  return todosResponse;
}

async function getTodoById(id: number) {
  const todo = await Todos.findOne({ id });
  return todo;
}

async function getLatestId() {
  const latestTodo = await Todos.findOne().sort('-id');
  if (!latestTodo) {
    return 0;
  }
  return latestTodo.id;
}

async function createTodo(todo: Todo) {
  const latestId = await getLatestId();
  const todoEntry = new Todos({ ...todo, id: latestId + 1 });
  const saved = await todoEntry.save();
  return saved;
}

async function updateTodo(id: number, update: TodoUpdate) {
  const updated = await Todos.findOneAndUpdate({ id }, update, { new: true });
  return updated;
}

async function deleteTodo(id: number) {
  const deleted = await Todos.findOneAndDelete({ id });
  return deleted;
}

export { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
