import axios from "axios";

// USED IN LOGIN PAGE
export const loginRequest = async (userInput, dispatch) => {
  dispatch({ type: "REQUEST_LOGIN" });
  try {
    const response = await axios.post("auth/login", userInput);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", payload: error });
  }
};

// USED IN MAIN PAGE
export const getAllTasks = (uid) => {
  return axios.get(`/tasks/all/${uid}`);
};

export const editSpecificTask = (task, newTitle, uid) => {
  return axios.put(`tasks/${task}`, {
    userId: uid,
    title: newTitle,
  });
};

export const addTask = (task) => {
  return axios.post("tasks/create", task);
};

export const deleteOneTask = (task, uid) => {
  return axios.delete(`tasks/${task}`, { data: { userId: uid } });
};

export const deleteAllTasks = (uid) => {
  return axios.delete(`tasks/deleteAll/${uid}`);
};

export const checkTaskComplete = (task, uid) => {
  return axios.patch(`tasks/${task}/complete`, {
    userId: uid,
  });
};

export const logoutRequest = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
