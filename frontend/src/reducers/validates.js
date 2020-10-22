import {
  VALIDATE_EMAIL,
  VALIDATE_FIRSTNAME,
  VALIDATE_LASTNAME,
  VALIDATE_PASSWORD,
  CONFIRM_PASSWORD,
} from "../actions/types";

const initialState = {
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  password2: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VALIDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case VALIDATE_FIRSTNAME:
      return {
        ...state,
        first_name: action.payload,
      };
    case VALIDATE_LASTNAME:
      return {
        ...state,
        last_name: action.payload,
      };
    case VALIDATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case CONFIRM_PASSWORD:
      return {
        ...state,
        password2: action.payload,
      };
    default:
      return state;
  }
}
