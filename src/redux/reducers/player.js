import { REQUEST_API, LOGIN, SCORE, ASSERTIONS, ZERASCORE } from '../action/action';

const INITIAL_STATE = {
  tokenReturn: {},

  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',

};

const player = (state = INITIAL_STATE, action) => {
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
      score: state.score + action.payload,
    };
  case ZERASCORE:
    return {
      ...state,
      score: 0,
    };

  case ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.data,
    };

  default:
    return state;
  }
};

export default player;
