const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  PID: {
    type: String,
    required: true,
  },
  OID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        required: true
  },
  UID: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
  },
  PaymentType: {
    type: String,
    required: true,
  },
  FullName: {
    type: String,
    required: true,
  },
  Contact_No: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  CardNumber: {
    type: String,
    required: true,
  },
  CVV: {
    type: String,
    required: true,
  },
  CardName: {
    type: String,
    required: true,
  },
  Expire: {
    type: String,
    required: true,
  },
  Transaction_Refrence: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now, 
    required: true,
  },
});

const Payment= mongoose.model("PaymentHistory", paymentSchema);


module.exports = Payment;