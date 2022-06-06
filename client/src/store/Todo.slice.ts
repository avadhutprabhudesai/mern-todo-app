import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoResponse, TodoState } from '../types';

/**
 * ============= Redux slice ==============
 */

const initialState: TodoState = {
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
    blockTodo: (state, action: PayloadAction<number>) => {
      state.blocked.push(action.payload);
    },
    releaseTodo: (state, action: PayloadAction<number>) => {
      state.blocked = state.blocked.filter((b) => b !== action.payload);
    },
    fetch: (state, action: PayloadAction<TodoResponse[]>) => {
      state.data = action.payload;
    },
    create: (state, action: PayloadAction<TodoResponse>) => {
      state.data.push(action.payload);
    },
    delete: (state, action: PayloadAction<TodoResponse>) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload.id);
    },
    edit: (state, action: PayloadAction<TodoResponse>) => {
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
