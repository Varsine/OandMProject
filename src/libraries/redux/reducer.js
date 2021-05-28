import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import * as slices from 'slices';

const combinedReducer = combineReducers({
  ...slices,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
    // eslint-disable-next-line no-else-return
  } else {
    return combinedReducer(state, action);
  }
};

export default reducer;
