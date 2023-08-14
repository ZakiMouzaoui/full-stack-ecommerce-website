import {
  CREATE_USER,
  FORGOT_PASSWORD,
  GET_ERROR,
  LOGIN_USER,
  RESET_PASSWORD,
  VERIFY_CODE,
} from "../type";

const initailState = {
  loginUser: null,
  createdUser: null,
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state = initailState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginUser: action.user,
        token: action.token,
        error: null,
      };
    case CREATE_USER:
      return {
        ...state,
        createdUser: action.user,
        token: action.token,
        error: null,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        error: null,
      };
    case VERIFY_CODE:
      return {
        ...state,
        error: null,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        token: action.token,
        error: null,
      };
    case GET_ERROR:
      return {
        ...state,
        loginUser: null,
        createdUser: null,
        token: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
