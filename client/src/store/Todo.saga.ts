import { all, call, put, takeEvery } from 'redux-saga/effects';
import todoSlice from './Todo.slice';
import { Todo, TodoActionPayload, TodoResponse } from '../types';
import {
  createTodoAPI,
  deleteTodoAPI,
  editTodoAPI,
  fetchAllTodosAPI,
} from '../api/todo.api';
/**
 * ============= Saga ==============
 */
function* fetchAllTodosWorker() {
  try {
    yield put(todoSlice.actions.unsetError());
    yield put(todoSlice.actions.setLoading());
    const todos: TodoResponse[] = yield call(() => {
      return fetchAllTodosAPI({ limit: 100, page: 1 });
    });
    yield put(todoSlice.actions.unsetLoading());
    yield put(todoSlice.actions.fetch(todos));
  } catch (error) {
    yield put(todoSlice.actions.unsetLoading());
    yield put(todoSlice.actions.setError());
  }
}

function* createTodoWorker({
  payload: { title, isDone },
}: {
  type: string;
  payload: Todo;
}) {
  try {
    yield put(todoSlice.actions.unsetError());
    const todo: TodoResponse = yield call(() => {
      return createTodoAPI({
        title,
        isDone,
      });
    });
    yield put(todoSlice.actions.create(todo));
  } catch (error) {
    yield put(todoSlice.actions.unsetLoading());
    yield put(todoSlice.actions.setError());
  }
}

function* deleteTodoWorker(action: { type: string; payload: number }) {
  try {
    yield put(todoSlice.actions.unsetError());
    yield put(todoSlice.actions.blockTodo(action.payload));
    const deleted: TodoResponse = yield call(() => {
      return deleteTodoAPI({ id: action.payload });
    });
    yield put(todoSlice.actions.releaseTodo(action.payload));
    yield put(todoSlice.actions.delete(deleted));
  } catch (error) {
    yield put(todoSlice.actions.unsetLoading());
    yield put(todoSlice.actions.releaseTodo(action.payload));
    yield put(todoSlice.actions.setError());
  }
}

function* editTodoWorker(action: { type: string; payload: TodoActionPayload }) {
  try {
    yield put(todoSlice.actions.unsetError());
    yield put(todoSlice.actions.blockTodo(action.payload.id));
    const edited: TodoResponse = yield call(() => {
      return editTodoAPI(action.payload.id, action.payload.update);
    });
    yield put(todoSlice.actions.edit(edited));
    yield put(todoSlice.actions.releaseTodo(action.payload.id));
  } catch (error) {
    yield put(todoSlice.actions.unsetLoading());
    yield put(todoSlice.actions.releaseTodo(action.payload.id));
    yield put(todoSlice.actions.setError());
  }
}

function* fetchTodoWatcher() {
  yield takeEvery('FETCH', fetchAllTodosWorker);
}
function* createTodoWatcher() {
  yield takeEvery('CREATE', createTodoWorker);
}
function* deleteTodoWatcher() {
  yield takeEvery('DELETE', deleteTodoWorker);
}
function* editTodoWatcher() {
  yield takeEvery('EDIT', editTodoWorker);
}

export default function* rootSaga() {
  yield all([
    fetchTodoWatcher(),
    createTodoWatcher(),
    deleteTodoWatcher(),
    editTodoWatcher(),
  ]);
}
