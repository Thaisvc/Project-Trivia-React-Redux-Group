export const REQUEST_API = 'REQUEST_API';
export const LOGIN = 'LOGIN';

export const requestApi = (data) => ({
  type: REQUEST_API,
  data,
});

export const loginPeople = (login) => ({
  type: LOGIN,
  login,
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
