import { paymentConstant } from "./constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const GetbyID = (UID) => {
  return async (dispatch) => {
    dispatch({ type: paymentConstant.GETBY_ID_PAYMENT_REQUEST });
    try {
      const res = await axios.post(
        "http://localhost:5000/Payment/getPaymentClient",
        UID
      );
      console.log(res)
      if (res.status === 200) {
        dispatch({
          type: paymentConstant.GETBY_ID_PAYMENT_SUCCESS,
          payload: res.data.payload,
        });
        toast.success("Payment History Refreshed..!", { id: "getID" });
      }
    } catch (error) {
      dispatch({
        type: paymentConstant.GETBY_ID_PAYMENT_FALIURE,
      });
      toast.error("Somthing went wrong..!");
    }
  };
};

export const GetAll = () => {
  return async (dispatch) => {
    dispatch({ type: paymentConstant.GETALL_PAYMENT_REQUEST });
    try {
      const res = await axios.get("http://localhost:5000/Payment/GetAllbyAdmin");
      if (res.status === 200) {
        dispatch({
          type: paymentConstant.GETALL_PAYMENT_SUCCESS,
          payload: res.data.payload,
        });
        toast.success("Payment List Refreshed..!", { id: "getall" });
      }
    } catch (error) {
      dispatch({
        type: paymentConstant.GETALL_PAYMENT_FALIURE,
      });
      toast.error("Somthing went wrong..!");
    }
  };
};

export const ChangeStatus = (data) => {
  return async (dispatch) => {
    dispatch({ type: paymentConstant.UPDATE_PAYMENT_REQUEST });
    try {
      const res = await axios.post(
        "http://localhost:5000/Payment/updatePayment",
        data
      );
      if (res.status === 201) {
        dispatch({
          type: paymentConstant.UPDATE_PAYMENT_SUCCESS,
          payload: res.data.payload
        });
        toast.success("Status Updated..!", { id: "changeStatus" });
      }
    } catch (error) {
      dispatch({
        type: paymentConstant.UPDATE_PAYMENT_FALIURE,
      });
      toast.error("Somthing went wrong..!");
    }
  };
};
