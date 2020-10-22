import {
  MY_EXPERIENCE,
  UPDATE_EXPERIENCE,
  CREATE_EXPERIENCE,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  myExpe: [],
  update: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_EXPERIENCE:
      return {
        ...state,
        update: false,
        myExpe: action.payload,
      };
    // case UPDATE_EXPERIENCE:
    //   return {
    //     ...state,
    //     myExpe: [...state.myExpe, action.payload],
    //   };
    case CREATE_EXPERIENCE:
      return {
        ...state,
        myExpe: [...state.myExpe, action.payload],
      };
    case LOGOUT_SUCCESS:
      return {
        myExpe: [],
        update: false,
      };
    default:
      return state;
  }
}
