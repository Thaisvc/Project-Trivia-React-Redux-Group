export const REQUEST_API = 'REQUEST_API';
export const LOGIN = 'LOGIN';
export const SCORE = 'SCORE';
export const ASSERTIONS = 'ASSERTIONS';
export const ZERASCORE = 'ZERASCORE';

export const requestApi = (data) => ({
  type: REQUEST_API,
  data,
});

export const loginPeople = (login) => ({
  type: LOGIN,
  login,
});

export const addScore = (payload) => ({
  type: SCORE,
  payload,
});
export const zeraScore = (payload) => ({
  type: ZERASCORE,
  payload,
});

export const getApiLogin = (token) => async (dispatch) => {
  try {
    // const response = await fetch('https://opentdb.com/api_token.php?command=request');
    // const data = await response.json();
    // localStorage.setItem('token', data.token);

    const newResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const newData = await newResponse.json();
    dispatch(requestApi(newData));
  } catch (error) {
    console.log(error);
  }
};

export const assertionsQuestions = (data) => ({
  type: ASSERTIONS,
  data,
});
