import { REQUEST_API } from '../action/action';

const INITIAL_STATE = {
  tokenReturn: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      tokenReturn: action.data,
    };
  default:
    return state;
  }
};

export default loginReducer;
