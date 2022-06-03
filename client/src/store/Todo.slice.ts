import { createSlice } from '@reduxjs/toolkit';
import { State } from '../types';

/**
 * ============= Redux slice ==============
 */

const initialState: State = {
  isLoading: false,
  error: false,
  data: [],
  blocked: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    unsetLoading: (state) => {
      state.isLoading = false;
    },
    setError: (state) => {
      state.error = true;
    },
    unsetError: (state) => {
      state.error = false;
    },
    blockTodo: (state, action) => {
      state.blocked.push(action.payload);
    },
    releaseTodo: (state, action) => {
      state.blocked = state.blocked.filter((b) => b !== action.payload);
    },
    fetch: (state, action) => {
      console.log('action in todoslice/fetch', action);
      state.data = action.payload;
    },
    create: (state, action) => {
      console.log('action in todoslice/create', action);
      state.data.push(action.payload);
    },
    delete: (state, action) => {
      console.log('action in todoslice/delete', action);
      state.data = state.data.filter((todo) => todo.id !== action.payload.id);
    },
    edit: (state, action) => {
      console.log('action in todoslice/delete', action);
      state.data = state.data.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
    },
  },
});

export default todoSlice;
