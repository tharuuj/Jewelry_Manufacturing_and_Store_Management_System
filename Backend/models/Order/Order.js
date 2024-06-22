
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        OrderId:{
            type:String,//data type
            required:true,//validate
        },


        CustomerName:{
            type:String,//data type
            required:true,//validate
        },

        
        ItemName:{
            type:String,//data type
            
        },

        ItemNumber:{
            type:String,//data type
            
        },

        Quantity:{
            type:Number,//data type
            
        },

        ItemAmount:{
            type:Number,//data type
           
        },

        TotalAmount:{
            type:Number,//data type
           
        },

        ContactNumber:{
            type:Number,//data type
            required:true,//validate
        },

        Address:{
            type:String,//data type
            required:true,//validate
        },


        OrderType:{
            type:String,//data type
            
        },


        Date:{
            type:String,//data type
            required:true,//validate
        },

        OnlineItem:[
            {
                ProductId:{
                    type:String,//data type
                    
                },
        
                Quantity:{
                    type:String,//data type
                    
                },
        
            }
        ],
      
  

    }
);

module.exports = mongoose.model(
    "Orders",//file name
    Order//function name
)