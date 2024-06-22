import { checkoutConstant } from "../actions/constants";

const initState = {
  loading: false,
  display:false
};

export default (state = initState, action) => {
  switch (action.type) {
    case checkoutConstant.NEW_CHECKOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case checkoutConstant.NEW_CHECKOUT_SUCCESS:
      state = {
        ...state,
        loading: false,
        display:true
      };
      break;
    case checkoutConstant.NEW_CHECKOUT_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break; 
  }
  return state;
};
