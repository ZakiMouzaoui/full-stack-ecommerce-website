import { insertData } from "../../hooks/useInsertData";
import { updateData } from "../../hooks/useUpdateData";
import {
  CREATE_USER,
  FORGOT_PASSWORD,
  GET_ERROR,
  LOGIN_USER,
  RESET_PASSWORD,
  VERIFY_CODE,
} from "../type";

export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await insertData("/auth/login", data);

    dispatch({
      type: LOGIN_USER,
      user: res.data,
      token: res.token,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_ERROR,
      payload: e,
    });
  }
};

export const createUser = (data) => async (dispatch) => {
  try {
    const res = await insertData("/auth/signup", data);

    dispatch({
      type: CREATE_USER,
      user: res.data,
      token: res.token,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_ERROR,
      payload: e,
    });
  }
};

export const forgotPassword = (data) => async (dispatch) => {
  try {
    await insertData("/auth/forgotPassword", data);

    dispatch({
      type: FORGOT_PASSWORD,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_ERROR,
      payload: e,
    });
  }
};

export const verifyCode = (data) => async (dispatch) => {
  try {
    await insertData("/auth/verifyResetCode", data);

    dispatch({
      type: VERIFY_CODE,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e,
    });
  }
};

export const resetPassword = (data) => async (dispatch) => {
  try {
    const res = await updateData("/auth/resetPassword", data);

    dispatch({
      type: RESET_PASSWORD,
      token: res.token,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_ERROR,
      payload: e,
    });
  }
};
