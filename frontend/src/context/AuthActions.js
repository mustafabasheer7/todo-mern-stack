export const REQUEST_LOGIN = () => ({
  type: "REQUEST_LOGIN",
});

export const LOGIN_SUCCESS = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LOGIN_ERROR = (error) => ({
  type: "LOGIN_ERROR",
  payload: error,
});

export const LOGOUT = () => ({
  type: "LOGOUT",
});
