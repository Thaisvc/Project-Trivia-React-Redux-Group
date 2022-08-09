import { REQUEST_API, NOME_PEOPLE, EMAIL_PEOPLE } from '../action/action';

const INITIAL_STATE = {
  tokenReturn: '',
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

  case NOME_PEOPLE:
    return {
      name: action.name,
    };

  case EMAIL_PEOPLE:
    return {
      gravatarEmail: action.email,
    };
  default:
    return state;
  }
};

export default loginReducer;
