import { combineReducers } from "redux";
import auth from "./auth";
import posts from "./posts";
import profiles from "./profiles";
import experience from "./experience";
import education from "./education";
import contact from "./contact";
import errors from "./errors";
import messages from "./messages";
import validates from "./validates";

export default combineReducers({
  auth,
  profiles,
  posts,
  experience,
  education,
  contact,
  errors,
  messages,
  validates,
});
