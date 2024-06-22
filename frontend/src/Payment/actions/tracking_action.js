import { trackingConstant } from "./constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const GetbyID = (UID) => {
  return async (dispatch) => {
    dispatch({ type: trackingConstant.GETBY_ID_DELIVERY_REQUEST });
    try {
      const res = await axios.post(
        "http://localhost:5000/Delivery/fetchDeliveryClient",
        UID
      );
      if (res.status === 200) {
        dispatch({
          type: trackingConstant.GETBY_ID_DELIVERY_SUCCESS,
          payload: res.data.payload,
        });
        toast.success("Tracking List Refreshed..!", { id: "getID" });
      }
    } catch (error) {
      dispatch({
        type: trackingConstant.GETBY_ID_DELIVERY_FALIURE,
      });
      toast.error("Somthing went wrong..!");
    }
  };
};

export const GetAll = () => {
  return async (dispatch) => {
    dispatch({ type: trackingConstant.GETALL_DELIVERY_REQUEST });
    try {
      const res = await axios.get("http://localhost:5000/Delivery/fetchall");
      if (res.status === 200) {
        dispatch({
          type: trackingConstant.GETALL_DELIVERY_SUCCESS,
          payload: res.data.payload,
        });
        toast.success("Tracking List Refreshed..!", { id: "getall" });
      }
    } catch (error) {
      dispatch({
        type: trackingConstant.GETALL_DELIVERY_FALIURE,
      });
      toast.error("Somthing went wrong..!");
    }
  };
};

export const ChangeStatus = (data) => {
  return async (dispatch) => {
    dispatch({ type: trackingConstant.UPDATE_DELIVERY_REQUEST });
    try {
      const res = await axios.post(
        "http://localhost:5000/Delivery/changeStatus",
        data
      );
      if (res.status === 201) {
        dispatch({
          type: trackingConstant.UPDATE_DELIVERY_SUCCESS,
          payload: res.data.payload
        });
        toast.success("Status Updated..!", { id: "changeStatus" });
      }
    } catch (error) {
      dispatch({
        type: trackingConstant.UPDATE_DELIVERY_FALIURE,
      });
      toast.error("Somthing went wrong..!");
    }
  };
};
