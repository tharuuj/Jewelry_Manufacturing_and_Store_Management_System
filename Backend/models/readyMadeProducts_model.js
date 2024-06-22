//import packages
const mongoose=require("mongoose");

const schema=mongoose.Schema;

//create model for readymade items

const readyMPro_schema=new schema({

//assign attributes

    item_name:{type:String,required:true},
   item_price:{type:Number,required:true},
    stock_count:{type:Number,required:true},
    thumb_img:{type:String,required:true},
    materiel:{type:String,required:true},
    category:{type:String,required:true}

})

//mongoDB document creation

const readyMPro=mongoose.model("readyMadeProduct",readyMPro_schema);

module.exports=readyMPro;