const express=require("express");
const Router=express.Router();

let employee=require("../models/employee_model");

Router.post("/emp",async(req,res)=>{


const{name,title}=req.body;

const NewEmployee=new employee({name,title
});

await NewEmployee.save().then(()=>{

res.status(500).send({status:"Employee Added"});


}).catch((err)=>{

console.log(err);
res.status(200).send({status:"error While Entering",err});


})





})

module.exports=Router;