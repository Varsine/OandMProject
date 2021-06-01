import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    activeIndex: 1,
    isNightMode: true,
  },

  reducers: {
    modeToggler: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isNightMode = !state.isNightMode;
    },
    changeIndex: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.activeIndex = payload;
    },
  },
});

export const { modeToggler, changeIndex } = mainSlice.actions;
export default mainSlice.reducer;

// selectors

const selectState = (state) => state.main;

export const modeSelector = createSelector(
  selectState,
  (state) => state.isNightMode,
);

export const activeIndexSelector = createSelector(
  selectState,
  (state) => state.activeIndex,
);
