import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddlware from 'redux-saga';
import rootSaga from './Todo.saga';
import todoSlice from './Todo.slice';
/**
 * Setup redux using redux toolkit
 * - install packages
 * - create store object
 * - create slice
 * - create saga middleware
 * - add saga to the store
 * -
 *
 *
 * API calls
 * - fetch todos
 * - create todo
 * - edit todo
 * - delete todo
 */

/**
 * ============= Redux store ==============
 */
const sagaMiddleware = createSagaMiddlware();
const store = configureStore({
  reducer: todoSlice.reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export const SAGA_ACTIONS = {
  FETCH: 'FETCH',
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
};

export default store;
