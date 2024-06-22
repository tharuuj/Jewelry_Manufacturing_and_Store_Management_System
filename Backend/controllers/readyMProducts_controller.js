//importing models
let readyMadeProduct=require("../models/readyMadeProducts_model");


//Inserting Ready Made Items


exports.addReadyMproduct=async(req,res)=>{

  const item_name=req.body.item_name;
  const item_price=Number(req.body.item_price);
  const stock_count=Number(req.body.stock_count);
  const thumb_img=req.body.thumb_img;
  const materiel=req.body.materiel;
  const category=req.body.category;

    const NewRMItem=new readyMadeProduct({
        item_name,
        item_price,
        stock_count,
        thumb_img,
        materiel,
        category


    });

    await NewRMItem.save().then(()=>{

        res.status(200).send({status:"new ready made Item Added"});



    }).catch((err)=>{

        console.log(err);
        res.status(500).send({status:"Error While Inserting",err});

    })

}


//Gather All Ready Made Items

exports.getAllReadyMitems=async(req,res)=>{


await readyMadeProduct.find().then((RMproducts)=>{

res.json(RMproducts);


}).catch((err)=>{
    res.status(200).send({status:"Error While fetching",err});
})



}

//gether product By id

exports.getReadyMadeProductById=async(req,res)=>{

let proID=req.params.id;

await readyMadeProduct.findById(proID).then((rMproduct)=>{

res.json(rMproduct);


}).catch((err)=>{

    res.status(200).send({status:"Error While fetching",err});

})



}


//delete
exports.deleteRMproduct=async(req,res)=>{

    let proid=req.params.id;

    await readyMadeProduct.findByIdAndDelete(proid).then(()=>{
        res.status(200).send({status:"RM Product Deleted"})
  
     }).catch((err)=>{
  
         console.log(err);
     res.status(500).send({status:"Error While Deleting"})
  
     })



   }


   ////

   exports.updateRM=async(req,res)=>{

    let proid=req.params.id;


const{

    item_name,
    item_price,
    stock_count,
    thumb_img,
    materiel,
    category

 




}=req.body;



const ex_product=await readyMadeProduct.findById(proid);


//assigning values
ex_product.item_name=item_name;
ex_product.item_price=item_price;
ex_product.stock_count=stock_count;
ex_product.thumb_img=thumb_img;
ex_product.category=category;
ex_product.materiel=materiel;

const updatedproduct=await ex_product.save().then(()=>{


    res.status(200).send({status:"product Updated"})
 }).catch((err)=>{
    

     console.log(err);
     res.status(500).send({status:"Error While updating",flist,cat})
 
 })

   }
