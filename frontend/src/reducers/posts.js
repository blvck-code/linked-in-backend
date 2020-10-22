import { FETCH_POSTS, CREATE_POST, LOGOUT_SUCCESS } from "../actions/types";

const initialState = {
  posts: [],
  count: "",
  next: null,
  previous: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case LOGOUT_SUCCESS:
      return {
        posts: [],
        count: "",
        next: null,
        previous: null,
      };
    default:
      return state;
  }
}
