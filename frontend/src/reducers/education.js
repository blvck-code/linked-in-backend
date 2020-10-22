import { MY_EDUCATION, ADD_EDUCATION, LOGOUT_SUCCESS } from "../actions/types";

const initialState = {
  myEdu: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_EDUCATION:
      return {
        ...state,
        myEdu: action.payload,
      };
    case ADD_EDUCATION:
      return {
        ...state,
        myEdu: [...state.myEdu, action.payload],
      };
    case LOGOUT_SUCCESS:
      return {
        myEdu: [],
      };
    default:
      return state;
  }
}
