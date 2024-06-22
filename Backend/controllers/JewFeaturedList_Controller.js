//importing utilities
let feaList=require("../models/showcaseFeaturedList_model");


//creating categories

exports.setFList=async(req,res)=>{

const{type}=req.body;

const newFlist=new feaList({FL_type:type});

await newFlist.save().then(()=>{

res.status(500).send({status:"FeatuedList Added"});


}).catch((err)=>{

res.status(200).send({status:"Error While adding",err});



})





}
//call all categories

exports.fetchallFlists=async(req,res)=>{


await feaList.find().then((flists)=>{

res.json(flists);



}).catch((err)=>{

res.status(200).send({status:"error while fetching",err})



})
}
//fetch category by id

exports.fetchFlistByID=async(req,res)=>{

    let fLid=req.params.id;

await ShowCat.findById(fLid).then((flist)=>{

res.json(flist);

}).catch((err)=>{

    res.status(200).send({status:"error while fetching",err})
    
    
    
    })



}




