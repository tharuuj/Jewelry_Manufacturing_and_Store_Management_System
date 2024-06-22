//importing modules
const customer=require("../models/customer_model");




exports.addcus=async(req,res)=>{


    const {name}=req.body;
    
    const newCustomer=new customer({
    name
    
    
    
    })
    
    await newCustomer.save().then(()=>{
        res.json("c Added");
        
        
        }).catch((err)=>{
        
            console.log("Cantot be addeed",err);
        })
        
        
    
    
    
    
    }
  