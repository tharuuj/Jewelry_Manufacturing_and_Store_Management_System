import { paymentConstant } from "../actions/constants";

const initState = {
  payments: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case paymentConstant.GETALL_PAYMENT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case paymentConstant.GETALL_PAYMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        payments: action.payload,
      };
      break;
    case paymentConstant.GETALL_PAYMENT_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case paymentConstant.GETBY_ID_PAYMENT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case paymentConstant.GETBY_ID_PAYMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        payments: action.payload,
      };
      break;
    case paymentConstant.GETBY_ID_PAYMENT_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case paymentConstant.UPDATE_PAYMENT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case paymentConstant.UPDATE_PAYMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        payments: action.payload,
      };
      break;
    case paymentConstant.UPDATE_PAYMENT_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
