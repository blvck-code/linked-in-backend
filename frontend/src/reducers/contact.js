import { MY_CONTACT, UPDATE_CONTACT, LOGOUT_SUCCESS } from "../actions/types";

const initialState = {
  myContact: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_CONTACT:
      return {
        ...state,
        myContact: action.payload,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        myContact: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        myContact: {},
      };
    default:
      return state;
  }
}
