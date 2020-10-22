import { MY_CONTACT, UPDATE_CONTACT, GET_ERRORS } from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";
import { createMessage } from "./messages";

// MY CONTACT
export const myContact = () => (dispatch, getState) => {
  axios
    .get(
      "http://localhost:8000/api/contact/user-contact",
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: MY_CONTACT,
        payload: res.data,
      });
    })
    .catch((err) => console.log("ERROR", err));
};

// MY UPDATE
export const updateContact = (
  id,
  {
    website_url,
    website_url_type,
    phone,
    phone_type,
    github_username,
    twitter_username,
    birthday,
    address,
  }
) => (dispatch, getState) => {
  const body = JSON.stringify({
    website_url,
    website_url_type,
    phone,
    phone_type,
    github_username,
    twitter_username,
    birthday,
    address,
  });

  axios

    .put(
      `http://localhost:8000/api/contact/${id}/update`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
      dispatch(createMessage({ contactAdded: "Contact Updated Successfully" }));
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
