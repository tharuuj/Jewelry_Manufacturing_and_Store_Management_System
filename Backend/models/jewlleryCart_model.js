//import packages
const mongoose=require("mongoose");

const schema=mongoose.Schema;

//create model for cart 

const jewCart_Schema=new schema({

//assign attributes
products:
{
item:{type:mongoose.Schema.Types.ObjectId,ref:"showcaseProduct",required:true},
qty:{type:Number,required:true},



},
totalAmount:{type:Number,required:true},
user:{type:mongoose.Schema.Types.ObjectId,ref:"customers",required:true}


})

//mongoDB document creation

const JewCart=mongoose.model("jewlerryCart",jewCart_Schema);

module.exports=JewCart;