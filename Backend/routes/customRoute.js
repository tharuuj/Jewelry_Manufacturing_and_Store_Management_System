const express=require("express");
const Router=express.Router();

let customers=require("../models/customer_model");

Router.route("/addC").post(async(req,res)=>{


const {name}=req.body;

const newCustomer=new customers({
name



})

await newCustomer.save().then(()=>{
    res.status(200).send({status:"New Customer Added"})
    
    
    }).catch((err)=>{
    
        console.log(err);
        res.status(500).send({status:"error While Insertion",err})
    })
    
    




})


module.exports=Router;