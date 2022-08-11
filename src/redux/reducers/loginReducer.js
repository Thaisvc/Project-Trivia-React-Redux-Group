import { REQUEST_API, LOGIN, SCORE } from '../action/action';

const INITIAL_STATE = {
  tokenReturn: {},

  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',

};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      tokenReturn: action.data,
    };

  case LOGIN:
    return {
      ...state,
      name: action.login.name,
      Email: action.login.email,
    };
  case SCORE:
    return {
      ...state,
      score: action.payload,
    };

  default:
    return state;
  }
};

export default loginReducer;
