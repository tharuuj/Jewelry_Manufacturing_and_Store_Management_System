const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
        
    },
    intime: {
        type: String,
        required: true
    },
    outtime: {
        type: String,
        default: null
    },   
    workingtime: {
        type: String,
        default: null
    },
    overtime: {
        type: String,
        default: null
    },
    attdate: {
        type: Date,
        required: true
    },
    
    datecreated:Date,
    dateUpdated:Date
});

// model
const attendance = new mongoose.model("attendance",attendanceSchema);

module.exports = attendance;