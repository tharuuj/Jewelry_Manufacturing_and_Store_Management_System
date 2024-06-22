const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    DOB: {
        type: String,
        required: [true, "Please add DOB"],
    },
    address: {
        type: String,
        required: [true, "Please add an address"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add a phone number"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Please add a username"],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        set: function(value) {
            // Hash the password before saving
            const hashedPassword = bcrypt.hashSync(value, 10);
            return hashedPassword;
        },
    },
    role: {
        type: String,
      
    },
    nic: {
        type: String,
       
    },
});



module.exports = mongoose.model("c", userSchema);
