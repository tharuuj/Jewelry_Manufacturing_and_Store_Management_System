//importing model
let customrate=require("../models/customerShowrate_model");
const cser=require("../models/customer_model");
exports.setShowrates=async(req,res)=>{

    const Uid=req.params.id;

    const{rating,user}=req.body;

  /*  
    const User=cser.findById(user);
       if (!User) {
        return res.status(404).json({ error: 'User not found' });
      }
*/

     const newrate=new customrate({rating,user:user});

     await newrate.save().then(()=>{

        res.status(200).send({status:"created"});


     }).catch((err)=>{

        res.status(500).send({status:"Error While Adding",err});


     })

}


//fetch rate
exports.fetchrate=async(req,res)=>{

await customrate.find().populate('user').then((cusrte)=>{

 res.json(cusrte);


 }).catch((err)=>{

    res.status(500).send({status:"Error While fetching",err});


 })



}
//fetch Rate By ID

exports.fetchrateByID=async(req,res)=>{

let rateID=req.params.rId;

await customrate.findById(rateID).populate('user').then((rte)=>{

res.json(rte);



}).catch((err)=>{

   res.status(500).send({status:"Error While fetching",err});


})

}

//deletinging rate

exports.deleteRate=async(req,res)=>{

   let rateID=req.params.rId;

   await customrate.findByIdAndUpdate(rateID).then(()=>{
      res.status(200).send({status:"Rate Deleted"})

   }).catch((err)=>{

       console.log(err);
   res.status(500).send({status:"Error While Deleting"})

   })

}

//update Rate
exports.updaterate=async(req,res)=>{

let rateID=req.params.rId;
const{rating,user}=req.body;

let updatedrate=new customrate({rating,user:user});


await customrate.findByIdAndUpdate(rateID,updatedrate).then(()=>{


   res.status(200).send({status:"Rate Updated"})
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error While updating"})

})





}