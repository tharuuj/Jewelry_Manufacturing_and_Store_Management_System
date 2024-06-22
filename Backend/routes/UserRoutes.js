const express=require("express");
const { check } = require('express-validator');

const router=express.Router();
//Insert Model
const User=require("../models/UserModel")
//Insert User Controller
const UserController=require("../controllers/UserControllers");

const { validateSignupRequest, isRequestValidated,validateSigninRequest } = require("../validators/user");
const { requireAuth } = require('../common-middleware');


// Route to fetch details of the logged-in user
router.get("/:id", requireAuth, UserController.getUserDetails);
router.get("/",UserController.getAllUsers);
router.post("/",UserController.addUsers);
router.get("/:id", UserController.getById);
router.put("/:id",requireAuth,UserController.updateUser);
router.delete("/:id",requireAuth,UserController.deleteUser);



// UserRoutes.js


router.post('/signin',validateSigninRequest,isRequestValidated, UserController.signIn);

router.post('/signup',validateSignupRequest,isRequestValidated,UserController.signUp)

/*router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({user:'profile'})
});*/


module.exports = router;

