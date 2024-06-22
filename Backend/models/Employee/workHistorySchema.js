const mongoose = require("mongoose");

const workHistorySchema = new mongoose.Schema({

    employeesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',        
    },
    itemdes: {
        type: String,
        required: true,
        trim: true
    },
    workstartdate: {
        type: Date,
        required: true
    },
    workestimateddate: {
        type: Date,
        default: null
    },   
    workprice: {
        type: String,
        required: true,
        trim: true
    },
    workenddate: {
        type: Date,
        default: null
    },
    workstatus: {
        type: String,
        required: true,
    },    
    
    

    datecreated:Date,
    dateUpdated:Date
});

// model
const workhistory = new mongoose.model("workhistory",workHistorySchema);

module.exports = workhistory;