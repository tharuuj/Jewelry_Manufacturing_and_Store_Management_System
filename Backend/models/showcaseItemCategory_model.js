//import packages
const mongoose=require("mongoose");

const schema=mongoose.Schema;

//create model for Categories 

const ShowItemcategory_Schema=new schema({

//assign attributes
type:{type:String,required:true},
Cat_discrip:{type:String,required:true},
Cat_thumbnail:{type:String,required:true}


})

//mongoDB document creation

const showItemCategory=mongoose.model("show_Icategory",ShowItemcategory_Schema);

module.exports=showItemCategory;