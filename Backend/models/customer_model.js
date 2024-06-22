//import packages
const mongoose=require("mongoose");

const schema=mongoose.Schema;

//create model for customer 

const customer_schema=new schema({

//assign attributes
name:{type:String,required:true},



})

//mongoDB document creation

const customer=mongoose.model("customers",customer_schema);

module.exports=customer;