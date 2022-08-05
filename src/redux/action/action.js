export const REQUEST_API = 'REQUEST_API';
export const requestApi = (data) => ({
  type: 'REQUEST_API',
  data,
});

export const getApiLogin = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    const tokenLocalStorage = localStorage.getItem('token');
    console.log(typeof tokenLocalStorage);
    const newResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenLocalStorage}`);
    const newData = await newResponse.json();
    dispatch(requestApi(newData));
  } catch (error) {
    console.log(error);
  }
};
