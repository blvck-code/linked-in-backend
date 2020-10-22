import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  VALIDATE_EMAIL,
  VALIDATE_FIRSTNAME,
  VALIDATE_LASTNAME,
  VALIDATE_PASSWORD,
  CONFIRM_PASSWORD,
} from "./types";
import { createMessage } from "./messages";

// GET USER
export const getUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("http://127.0.0.1:8000/api/auth/user", tokenConfig(getState))
    .then((res) => {
      // dispatch(createMessage({ loginError: res.data }));
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// LOG IN
export const login = (email, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  axios
    .post("http://127.0.0.1:8000/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    });
  dispatch({
    type: LOGIN_ERROR,
  });
};

// REGISTER
export const register = ({
  email,
  first_name,
  last_name,
  password,
  password2,
}) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    email,
    first_name,
    last_name,
    password,
    password2,
  });

  axios
    .post("http://127.0.0.1:8000/api/auth/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_ERROR,
      });
    });
};

// LOG OUT
export const logout = () => (dispatch, getState) => {
  axios
    .post("http://127.0.0.1:8000/api/auth/logout", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// VALIDATE EMAIL
export const validateEmail = (email) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  axios
    .post("http://127.0.0.1:8000/api/auth/validate-email", body, config)
    .then((res) => {
      dispatch({
        type: VALIDATE_EMAIL,
        payload: res.data,
      });
    })
    .catch((err) => console.log("ERROR", err));
};

// VALIDATE FIRSTNAME
export const validateFirstname = (first_name) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ first_name });

  axios
    .post("http://127.0.0.1:8000/api/auth/validate-firstname", body, config)
    .then((res) => {
      dispatch({
        type: VALIDATE_FIRSTNAME,
        payload: res.data,
      });
    })
    .catch((err) => console.log("ERROR", err));
};

// VALIDATE LASTNAME
export const validateLastname = (last_name) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ last_name });

  axios
    .post("http://127.0.0.1:8000/api/auth/validate-lastname", body, config)
    .then((res) => {
      dispatch({
        type: VALIDATE_LASTNAME,
        payload: res.data,
      });
    })
    .catch((err) => console.log("ERROR", err));
};

// VALIDATE PASSWORD
export const validatePassword = (password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ password });

  axios
    .post("http://127.0.0.1:8000/api/auth/validate-password", body, config)
    .then((res) => {
      dispatch({
        type: VALIDATE_PASSWORD,
        payload: res.data,
      });
    })
    .catch((err) => console.log("ERROR", err));
};

// VALIDATE PASSWORD
export const confirmPassword = (password, password2) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ password, password2 });

  axios
    .post("http://127.0.0.1:8000/api/auth/confirm-password", body, config)
    .then((res) => {
      console.log(res.data);

      dispatch({
        type: CONFIRM_PASSWORD,
        payload: res.data,
      });
    })
    .catch((err) => console.log("ERROR", err));
};

// Helper function
export const tokenConfig = (getState) => {
  // Get token
  const token = getState().auth.token;

  // Add
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Add token to config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
