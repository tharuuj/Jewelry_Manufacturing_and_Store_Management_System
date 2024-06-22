const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({

    empsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',        
    },
    leavedate: {
        type: Date,
        default: null
    },   
    leavedes: {
        type: String,
        required: true,
        trim: true
    },   

    datecreated:Date,
    dateUpdated:Date
});

// model
const leave = new mongoose.model("leave",leaveSchema);

module.exports = leave;