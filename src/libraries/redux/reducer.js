import { combineReducers } from 'redux';

import * as reducers from 'store/reducers';

const rootReducer = combineReducers({
  ...reducers,
});

export default rootReducer;
