const mongoose = require("mongoose");
const validator = require("validator");

const employeesSchema = new mongoose.Schema({
    empfname: {
        type: String,
        required: true,
        trim: true
    },
    emplname: {
        type: String,
        required: true,
        trim: true
    },
    empemail: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("Not a valid email")
            }
        }
    },
    empmobile: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    empaddress: {
        type: String,
        required: true,
        trim: true
    },
    empgender: {
        type: String,
        required: true,
    },
    empType: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    salaryPerDay: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        default: null
    },
    /*
    pdfFile: {
        type: String,
        required: true,
    },
    */
    datecreated:Date,
    dateUpdated:Date
});

// model
const employees = new mongoose.model("employees",employeesSchema);

module.exports = employees;