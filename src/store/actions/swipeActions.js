import { axiosInstance } from 'libraries/index';
import { createActionName } from 'utils/index';

export const SEND_TOKENS = createActionName('swipe', 'send_tokens');
export const SEND_TOKENS_STARTED = createActionName(
  'swipe',
  'send_tokens_started',
);
export const SEND_TOKENS_ERROR = createActionName('swipe', 'send_tokens_error');

export const swipeStarted = () => ({ type: SEND_TOKENS_STARTED });
export const swipeError = (err) => ({ type: SEND_TOKENS_ERROR, payload: err });
export const swipeFinished = (data) => ({ type: SEND_TOKENS, payload: data });

export const getTokenList = () => async (dispatch) => {
  try {
    dispatch(swipeStarted());
    const { data } = await axiosInstance.get('/tokens.json');
    dispatch(swipeFinished(data.tokens));
  } catch (err) {
    dispatch(swipeError(err));
  }
};
