import { checkoutConstant } from "./constants";
import axios from "axios";
import { toast } from "react-hot-toast";

export const Newcheckout = (data) => {
  return async (dispatch) => {
    dispatch({ type: checkoutConstant.NEW_CHECKOUT_REQUEST });
    try {
      const paymentRes = await axios.post(
        "http://localhost:8070/Payment/makePayment",
        data
      );
      if (paymentRes.status === 201) {
        try {
          const deliveryRes = await axios.post(
            "http://localhost:8070/Delivery/newDelivery",
            data
          );
          if (deliveryRes.status === 201) {
            dispatch({ type: checkoutConstant.NEW_CHECKOUT_SUCCESS });
            toast.success("New Order Placed!", { id: "orderp" });
          }
        } catch (deliveryError) {
          dispatch({
            type: checkoutConstant.NEW_CHECKOUT_FALIURE,
          });
          toast.error("Something went wrong in delivery..!!");
        }
      }
    } catch (paymentError) {
      dispatch({
        type: checkoutConstant.NEW_CHECKOUT_FALIURE,
      });
      console.log(paymentError);
      toast.error("Something went wrong in payment!");
    }
  };
};
