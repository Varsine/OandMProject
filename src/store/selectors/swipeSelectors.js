import { createSelector } from 'reselect';

export const selectState = (state) => state.swipe;

export const selectTokens = createSelector(
  selectState,
  (swipeState) => swipeState.tokenList,
);
