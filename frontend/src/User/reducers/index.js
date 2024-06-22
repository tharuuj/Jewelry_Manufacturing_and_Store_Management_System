import userReducers  from "./user.reducers";
import { combineReducers } from "redux";
import userReducer from './users.reducers';
import tracking_reducer from "../../Payment/reducers/tracking_reducer";
import payment_reducer from "../../Payment/reducers/payment_reducer";
import checkout_reducer from "../../Payment/reducers/checkout_reducer";

const rootReducer=combineReducers({
    auth:userReducers,
    user:userReducer,
    delivery: tracking_reducer,
    payment: payment_reducer,
    checkout: checkout_reducer
});

export default rootReducer;

