//import packages
const mongoose=require("mongoose");

const schema=mongoose.Schema;

//create model for discounts 

const showDiscounts_schema=new schema({

//assign attributes
type:{type:String,required:true},
precentage:{type:Number,required:true},
duration:{type:Number,required:true}
  

})

//mongoDB document creation

const showDiscounts=mongoose.model("show_discounts",showDiscounts_schema);

module.exports=showDiscounts;