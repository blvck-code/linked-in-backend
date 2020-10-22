import { MY_EDUCATION, ADD_EDUCATION, GET_ERRORS } from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";
import { createMessage } from "./messages";

// MY EDUCATION
export const myEduct = () => (dispatch, getState) => {
  axios
    .get(
      "http://127.0.0.1:8000/api/education/user-education",
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: MY_EDUCATION,
        payload: res.data,
      });
    })
    .catch((err) => console.log("ERROR", err));
};

//ADD EDUCATION
export const addEduct = ({
  school,
  degree,
  study_field,
  start,
  end,
  description,
}) => (dispatch, getState) => {
  const body = JSON.stringify({
    school,
    degree,
    study_field,
    start,
    end,
    description,
  });

  axios
    .post(
      "http://127.0.0.1:8000/api/education/create",
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: ADD_EDUCATION,
        payload: res.data,
      });
      dispatch(createMessage({ eduAdded: "Education Added" }));
    })
    .catch((err) => {
      const error = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};
