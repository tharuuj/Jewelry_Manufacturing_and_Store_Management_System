const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      mobileNumber: {
        type: String,
       
      },
  
      Date: {
        type: String,
       
      },
      Time: {
        type: String,
       
      },
 
});

module.exports = mongoose.model('App', appSchema);
