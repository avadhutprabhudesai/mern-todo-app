import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddlware from 'redux-saga';
import rootSaga from './Todo.saga';
import todoSlice from './Todo.slice';
import { bindActionCreators } from 'redux';
import { Todo, TodoActionPayload } from '../types';

/**
 * ============= Redux store ==============
 */
const sagaMiddleware = createSagaMiddlware();
const store = configureStore({
  reducer: todoSlice.reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

/**
 * ============= Action Creators ==============
 */
const SAGA_ACTIONS = {
  FETCH: 'FETCH',
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
};

export const sagaBoundActionCreator = bindActionCreators(
  {
    fetch: () => ({ type: SAGA_ACTIONS.FETCH }),
    create: ({ title, isDone }: Todo) => ({
      type: SAGA_ACTIONS.CREATE,
      payload: { title, isDone },
    }),
    edit: ({ id, update }: TodoActionPayload) => ({
      type: SAGA_ACTIONS.EDIT,
      payload: { id, update },
    }),
    delete: ({ id }: { id: number }) => ({
      type: SAGA_ACTIONS.DELETE,
      payload: id,
    }),
  },
  store.dispatch
);

// RootState contains the exact type of our state. We need not worry to check for dynamic keys
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
