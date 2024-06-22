//importing utilities
let ShowCat=require("../models/showcaseItemCategory_model");


//creating categories

exports.setShowCat=async(req,res)=>{

const{type,
    Cat_discrip,
    Cat_thumbnail
}=req.body;

const newCat=new ShowCat({type,Cat_discrip,Cat_thumbnail});

await newCat.save().then(()=>{

res.status(200).send({status:"Category Added"});


}).catch((err)=>{

res.status(500).send({status:"Error While adding",err});



})





}
//call all categories

exports.fetchallCategories=async(req,res)=>{


await ShowCat.find().then((cats)=>{

res.json(cats);



}).catch((err)=>{

res.status(200).send({status:"error while fetching",err})



})
}
//fetch category by id

exports.fetchCatByID=async(req,res)=>{

    let catID=req.params.id;

await ShowCat.findById(catID).then((category)=>{

res.json(category);

}).catch((err)=>{

    res.status(200).send({status:"error while fetching",err})
    
    
    
    })



}




