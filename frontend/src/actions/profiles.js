import {
  MY_PROFILE,
  UPDATE_PROFILE,
  GET_ERRORS,
  DEVELOPERS,
  DEVELOPER,
} from "./types";
import { tokenConfig } from "./auth";
import axios from "axios";
import { createMessage } from "./messages";

// GET USER PROFILE
export const myProfile = () => (dispatch, getState) => {
  axios
    .get(
      "http://localhost:8000/api/profile/user-profile",
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: MY_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => console.log("ERROR", err));
};

//UPDATE PROFILE
export const updateProfile = (
  id,
  { bg_pic, profile_pic, profession, headline, country, location }
) => (dispatch, getState) => {
  const profile = JSON.stringify({
    bg_pic,
    profile_pic,
    profession,
    headline,
    country,
    location,
  });
  axios
    .put(
      `http://127.0.0.1:8000/api/profile/${id}/update`,
      profile,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(
        createMessage({ profileUpdated: "Profile Updated Successfully" })
      );
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

// DEVELOPERS
export const developers = () => (dispatch, getState) => {
  axios
    .get("http://127.0.0.1:8000/api/profile/list", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DEVELOPERS,
        payload: res.data,
      });
    })
    .catch((err) => console.log("ERROR", err));
};

// DEVELOPER
export const developer = (slug) => (dispatch, getState) => {
  axios
    .get(`http://127.0.0.1:8000/api${slug}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DEVELOPER,
        payload: res.data,
      });
    })
    .catch((err) => console.log("ERROR", err));
};
