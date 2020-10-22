import { FETCH_POSTS, CREATE_POST, GET_ERRORS } from "./types";
import { createMessage } from "./messages";
import axios from "axios";
import { tokenConfig } from "./auth";

//FETCH_POSTS
export const fetchPost = () => (dispatch, getState) => {
  axios
    .get("http://127.0.0.1:8000/api/posts/?", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: FETCH_POSTS,
        payload: res.data,
      });
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

//CREATE POSTS
export const createPost = ({ body, image }) => (dispatch, getState) => {
  const post = JSON.stringify({ body, image });

  axios
    .post("http://localhost:8000/api/posts/create", post, tokenConfig(getState))
    .then((res) => {
      console.log("DATA", res.data);

      dispatch(createMessage({ postAdded: "Posts Added" }));
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      });
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
