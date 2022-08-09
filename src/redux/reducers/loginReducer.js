import { REQUEST_API, LOGIN } from '../action/action';

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

  default:
    return state;
  }
};

export default loginReducer;
