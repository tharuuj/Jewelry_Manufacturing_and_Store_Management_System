//import packages
const mongoose=require("mongoose");
const schema=mongoose.Schema;

//create model for showcase items
const showcaseProduct=new schema({

Title:{type:String,required:true},
brief:{type:String,required:true},
    discrip:{type:String,required:true},
    Item:{type:mongoose.Schema.Types.ObjectId,ref:"readyMadeProduct",required:true},
    Show_category:{type:mongoose.Schema.Types.ObjectId,ref:"show_Icategory",required:true},
    featuredList:{type:mongoose.Schema.Types.ObjectId,ref:"show_featuredList"},
    ratings:{type:mongoose.Schema.Types.ObjectId,ref:"Show_ratings"},
   showThumb_img:{type:String,required:true},
   showThumb_img_main:{type:String,required:true},
    show_img1:{type:String},

    show_img2:{type:String},
    show_img3:{type:String},
    show_img4:{type:String},
    show_img5:{type:String}




})


//mongoDB document creation
const ShowProduct=mongoose.model("showCaseProduct",showcaseProduct);
module.exports=ShowProduct;

