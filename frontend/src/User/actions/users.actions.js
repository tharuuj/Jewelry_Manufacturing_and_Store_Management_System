import { userConstants } from "./constants";
import axios from "axios";

export const signup = (user) => {
  console.log(user);
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });

    try {
      const res = await axios.post("http://localhost:8070/users/signup", {
        ...user,
      });

      if (res.status >= 200 && res.status < 300) {
        const { message } = res.data;

        dispatch({
          type: userConstants.USER_REGISTER_SUCCESS,
          payload: { message },
        });
      } else {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      // Handle network errors or other exceptions
      dispatch({
        type: userConstants.USER_REGISTER_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};