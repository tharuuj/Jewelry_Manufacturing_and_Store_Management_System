//importing models
let showcaseProduct=require("../models/showcaseProduct_model");
let readyMProducts=require("../models/readyMadeProducts_model");
let showcaseCat=require("../models/showcaseItemCategory_model");
let feaList=require("../models/showcaseFeaturedList_model");



//adding showcase products

exports.addproductToShowcase=async(req,res)=>{

const{

    title,
    brief,
    discrip,
    item,
    category,
   fList,
   rate,
    showThumb_img,
  thumb_main,
    showImg1,
    showImg2,
    showImg3,
    showImg4,
    showImg5


}=req.body;


let cat= await showcaseCat.findOne({type:category});
let flist=await feaList.findOne({FL_type:fList});





const newShowcaseItem=new showcaseProduct({
    Title:title,
    brief,
    discrip,
    Item:item,
    Show_category:cat._id,
    featuredList:flist._id,
    ratings:rate,
    showThumb_img,
    showThumb_img_main:thumb_main,
    show_img1:showImg1,
    show_img2:showImg2,
    show_img3:showImg3,
    show_img4:showImg4,
    show_img5:showImg5




});


await newShowcaseItem.save().then(()=>{

    res.status(200).send({status:"product Added to showcase"});
    
    
    }).catch((err)=>{
    
    res.status(500).send({status:"Error While adding",err});
    
    
    
    })

}


//fetch all products


exports.getAllShowcase=async(req,res)=>{


    await showcaseProduct.find().populate("Item Show_category featuredList ratings").then((showpro)=>{
    
    res.json(showpro);
    
    
    }).catch((err)=>{
        res.status(500).send({status:"Error While fetching",err});
    })
    
    
    
    }


   //get show case item by id
   
   exports.gettShowItembyID=async(req,res)=>{

        let proId=req.params.pid;

        await showcaseProduct.findById(proId).populate("Item Show_category featuredList ratings").then((showpro)=>{
    
    res.json(showpro);
    
    
    }).catch((err)=>{
        res.status(500).send({status:"Error While fetching",err});
    })
    
    
    



   }


   //find and delete

   exports.deleteShowcaseItem=async(req,res)=>{

    let proid=req.params.pid;

    await showcaseProduct.findByIdAndDelete(proid).then(()=>{
        res.status(200).send({status:"Shocase Product Deleted"})
  
     }).catch((err)=>{
  
         console.log(err);
     res.status(500).send({status:"Error While Deleting"})
  
     })



   }

   //update showcase Item

   exports.updateshowcase=async(req,res)=>{

    let proid=req.params.pid;
  

const{

    Title,
    brief,
    discrip,
    Item,
   // Show_category,
   // featuredList,
    //ratings,
    showThumb_img,
    showThumb_img_main,
    show_img1,
    show_img2,
    show_img3,
    show_img4,
    show_img5




}=req.body;

const ex_product=await showcaseProduct.findById(proid);

//let flist=await feaList.findOne({FL_type:featuredList});


//let cat= await showcaseCat.findOne({type:Show_category});



//assigning values
ex_product.Title=Title;
ex_product.brief=brief;
ex_product.discrip=discrip;
ex_product.Item=Item;
//ex_product.Show_category= cat._id;
//ex_product.featuredList= flist._id;
//ex_product.ratings=ratings;
ex_product.showThumb_img=showThumb_img;
ex_product.showThumb_img_main=showThumb_img_main;
ex_product.show_img1=show_img1;
ex_product.show_img2=show_img2;
ex_product.show_img3=show_img3;
ex_product.show_img4=show_img4;
ex_product.show_img5=show_img5;

const updatedproduct=await ex_product.save().then(()=>{


    res.status(200).send({status:"product Updated"})
 }).catch((err)=>{
    

     console.log(err);
     res.status(500).send({status:"Error While updating"})
 
 })


   }


/*
const updatedscitem=new showcaseProduct({

    Title:title,
    brief,
    discrip,
    Item:item,
    Show_category:cat? Catid:null,
    featuredList:flist? Fid:null,
    ratings:rate,
    showThumb_img,
    showThumb_img_main:thumb_main,
    show_img1:showImg1,
    show_img2:showImg2,
    show_img3:showImg3,
    show_img4:showImg4,
    show_img5:showImg5,




});


await showcaseProduct.findByIdAndUpdate(proid,updatedscitem).then(()=>{


    res.status(200).send({status:"product Updated"})
 }).catch((err)=>{
    

     console.log(err);
     res.status(500).send({status:"Error While updating",flist,cat})
 
 })
 */
 

 //Delete Product By Item

 exports.deleteShowcaseItemByItem=async(req,res)=>{

    let proid=req.params.pid;

    await showcaseProduct.findOneAndDelete({Item:proid}).then(()=>{
        res.status(200).send({status:"Showcase Product Deleted"})
  
     }).catch((err)=>{
  
         console.log(err);
     res.status(500).send({status:"Error While Deleting"})
  
     })



   }

   exports.FindProductsByItem=async(req,res)=>{

    let Item_id=req.params.pid;

    await showcaseProduct.findOne({Item:Item_id}).then((showpro)=>{

        if (showpro) {
            res.send({availability:true});
        } else {
            res.send({availability:false});
        }
        
    
    
    }).catch((err)=>{
        res.status(500).send({status:"Error While fetching",err});
    })
    




   }






