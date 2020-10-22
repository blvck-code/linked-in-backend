import {
  MY_PROFILE,
  UPDATE_PROFILE,
  LOGOUT_SUCCESS,
  DEVELOPERS,
  DEVELOPER,
} from "../actions/types";

const initialState = {
  myProfile: {},
  developers: [],
  developer: {},
  count: "",
  next: "",
  previous: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_PROFILE:
      return {
        ...state,
        myProfile: action.payload,
      };
    case DEVELOPERS:
      return {
        ...state,
        developers: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
      };
    case DEVELOPER:
      return {
        ...state,
        developer: action.payload,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        myProfile: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        myProfile: {},
      };
    default:
      return state;
  }
}
