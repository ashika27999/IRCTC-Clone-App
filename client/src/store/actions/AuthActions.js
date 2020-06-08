import Axios from "axios";

export const loginUser = (credentials) => {
  return async (dispatch, getState) => {
    console.log(credentials);
    await Axios.post('http://localhost:4000/login', credentials).then((res) => {
      console.log(res.data);
      if(res.data.code === 200) {
        console.log('Success');
        dispatch({ type: 'LOGIN_SUCCESS', user: res.data.data });
      }
      else {
        dispatch({ type: 'LOGIN_ERROR' });
      }
    });
  }
}