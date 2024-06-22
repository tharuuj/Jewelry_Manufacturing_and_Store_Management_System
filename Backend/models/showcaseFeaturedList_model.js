//import packages
const mongoose=require("mongoose");

const schema=mongoose.Schema;

//create model for featuredList 

const ShowFeaturedList_Schema=new schema({

//assign attributes
FL_type:{type:String,required:true},


})

//mongoDB document creation

const showFeaturedList=mongoose.model("show_featuredList",ShowFeaturedList_Schema);

module.exports=showFeaturedList;