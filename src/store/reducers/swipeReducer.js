import { HYDRATE } from 'next-redux-wrapper';

import { SEND_TOKENS } from '../actions/swipeActions';

const initialState = {
  tokenList: [],
};

const swipeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HYDRATE:
      return { ...state, ...payload.swipe };
    case SEND_TOKENS: {
      return { ...state, tokenList: payload };
    }
    default: {
      return state;
    }
  }
};

export default swipeReducer;
