const initState = {
  user: null,
  isAuthenticated: false,
  loginError: false,
};

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return {
        user: action.user,
        isAuthenticated: true,
        loginError: false,
      }
    case 'LOGIN_ERROR':
      return {
        user: null,
        isAuthenticated: false,
        loginError: true,
      }
    default:
      return(state);
  }
}

export default authReducer;