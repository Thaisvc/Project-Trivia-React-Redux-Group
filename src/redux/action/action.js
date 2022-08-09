export const REQUEST_API = 'REQUEST_API';
export const NOME_PEOPLE = 'NOME_PEOPLE';
export const EMAIL_PEOPLE = 'EMAIL_PEOPLE';

export const requestApi = (data) => ({
  type: REQUEST_API,
  data,
});

export const namePeople = (name) => ({
  type: NOME_PEOPLE,
  name,
});

export const emailPeople = (email) => ({
  type: EMAIL_PEOPLE,
  email,
});

export const getApiLogin = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    const tokenLocalStorage = localStorage.getItem('token');
    const newResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenLocalStorage}`);
    const newData = await newResponse.json();
    dispatch(requestApi(newData));
  } catch (error) {
    console.log(error);
  }
};
