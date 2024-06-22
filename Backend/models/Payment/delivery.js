const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
  Tracking_Number: {
    type: String,
    required: true,
  },
  OID: {
    type: String,
    required: true,
  },
  UID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  FullName: {
    type: String,
    required: true,
  },
  Address: {
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
  City: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  ZipCode: {
    type: String,
    required: true,
  },
  Country: {
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

const Delivery= mongoose.model("delivery", deliverySchema);


module.exports = Delivery;
