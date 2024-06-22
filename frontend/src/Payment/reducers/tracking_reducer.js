import { trackingConstant } from "../actions/constants";

const initState = {
  deliveries: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case trackingConstant.GETBY_ID_DELIVERY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case trackingConstant.GETBY_ID_DELIVERY_SUCCESS:
      state = {
        ...state,
        loading: false,
        deliveries: action.payload,
      };
      break;
    case trackingConstant.GETBY_ID_DELIVERY_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case trackingConstant.GETALL_DELIVERY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case trackingConstant.GETALL_DELIVERY_SUCCESS:
      state = {
        ...state,
        loading: false,
        deliveries: action.payload,
      };
      break;
    case trackingConstant.GETALL_DELIVERY_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case trackingConstant.UPDATE_DELIVERY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case trackingConstant.UPDATE_DELIVERY_SUCCESS:
      state = {
        ...state,
        loading: false,
        deliveries: action.payload,
      };
      break;
    case trackingConstant.UPDATE_DELIVERY_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
