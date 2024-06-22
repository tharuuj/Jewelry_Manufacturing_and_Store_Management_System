import { combineReducers } from "redux";
import tracking_reducer from "./tracking_reducer";
import payment_reducer from "./payment_reducer";
import checkout_reducer from "./checkout_reducer";

const rootReducer = combineReducers({
    delivery: tracking_reducer,
    payment: payment_reducer,
    checkout: checkout_reducer
});

export default rootReducer;