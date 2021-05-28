import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    todoList: [],
  },

  reducers: {
    addItem: () => {},
  },
});

export const { addItem } = mainSlice.actions;

export default mainSlice.reducer;
