//import packages
const mongoose=require("mongoose");

const schema=mongoose.Schema;

//create model for wishlist 

const wishlist_schema=new schema({

//assign attributes

user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
wishlistItems:[
    { 
        product: {type:mongoose.Schema.Types.ObjectId,ref:"showCaseProduct",required:true},
        addedAt: {type: Date, default: Date.now}
    }
],


})

//mongoDB document creation

const wishlist=mongoose.model("Wishlist",wishlist_schema);

module.exports=wishlist;