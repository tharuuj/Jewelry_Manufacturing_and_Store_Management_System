//insert model

const User = require("../../models/Order/Order");


   /////////////////////////////////////////////// //data display part//////////////////////////////////////////////
const getAllOrders = async(req, res, next) => {

    let users;
    
    //get all users

    try{
       users = await User.find();
    }
    catch{
        console.log(err);
    }

    //not found
     if(!users) {
        return  res.status(404).json ({message:"user not found"});
     }

     //display all users
     return res.status(200).json({users});
};

exports.getAllOrders = getAllOrders;





/////////////////////////////////////////////////////////data insert part////////////////////////////////////////////////

const addOrders  = async(req, res, next) => {

   const {OrderId,CustomerName,ItemName,ItemNumber,Quantity,ItemAmount,TotalAmount,ContactNumber,Address,OrderType,Date,OnlineItem} = req.body;

   let users;

   try{
      users = new User ({OrderId,CustomerName,ItemName,ItemNumber,Quantity,ItemAmount,TotalAmount,ContactNumber,Address,OrderType,Date,OnlineItem});
      await users.save();
   }

   catch (err){
      console.log(err);
   }

   //not insert users
   if(!users){
      return res.status(404).json({message:"unable to add usres"});
   }
   return res.status(200).json({users});


};



      //////////////////////////////////////////////////////get by id///////////////////////////////////////////////

      const getById = async (req, res, next) => {

         const id = req.params.id;

         let user;

         try{
            user = await User.findById(id);
         }
         catch(err)
         {
            console.log(err);
         }

         
   //not available users
   if(!user){
      return res.status(404).json({message:"user not found"});
   }
   return res.status(200).json({user});
 }   
                                                           


 ////////////////////////////////////////////////update data/////////////////////////////////////////////////////////

 const updateOrder = async (req, res, next) =>  //update function
 {
   const id = req.params.id;
   const {OrderId,CustomerName,ItemName,ItemNumber,Quantity,ItemAmount,TotalAmount,ContactNumber,Address,OrderType,Date} = req.body;

   let users; //new varible

   try
   {
      users = await User.findByIdAndUpdate(id,
         {OrderId:OrderId , CustomerName:CustomerName , ItemName:ItemName , ItemNumber:ItemNumber , Quantity:Quantity , ItemAmount:ItemAmount ,
             TotalAmount:TotalAmount , ContactNumber:ContactNumber , Address:Address , OrderType:OrderType , Date:Date});  //update detaills

             users = await users.save();  //ssave details
      }
      catch(err)
      {
         console.log(err);
      }

       //not available users
   if(!users){
      return res.status(404).json({message:"user not update"});
   }
   return res.status(200).json({users});


 }


 /////////////////////////////////////////////////delette function//////////////////////////////////////////////////

 const deleteOrder = async (req, res, next) =>  //delete function
 {
   const id = req.params.id;

   let user; //new varible

   try
   {
      user = await User.findByIdAndDelete(id)
   }
   catch(err)
   {
      console.log(err);
   }

    //not available users
   if(!user)
   {
   return res.status(404).json({message:"user not delete"});
   }
    return res.status(200).json({user});

};
/////////////////////////////////////////////////All functions//////////////////////////////////////////////////////
exports.getAllOrders = getAllOrders;
exports.addOrders = addOrders;
exports.getById = getById;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;