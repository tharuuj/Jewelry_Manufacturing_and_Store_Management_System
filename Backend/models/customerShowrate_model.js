//import packages
const mongoose=require("mongoose");

const schema=mongoose.Schema;

//create model for ratings 

const showRate_schema=new schema({

//assign attributes
rating:{type:Number,required:true},
user:{type:mongoose.Schema.Types.ObjectId,ref:"customers",required:true}


})

//mongoDB document creation

const showRate=mongoose.model("Show_ratings",showRate_schema);

module.exports=showRate;