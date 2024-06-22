//import packages
const mongoose=require("mongoose");

const schema=mongoose.Schema;

//create model for customer 

const employee_schema=new schema({

//assign attributes
name:{type:String,required:true},
title:{type:String,required:true}



})

//mongoDB document creation

const employee=mongoose.model("employee",employee_schema);

module.exports=employee;