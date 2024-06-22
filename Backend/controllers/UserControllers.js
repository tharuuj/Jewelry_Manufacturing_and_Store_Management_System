const User=require("../models/UserModel");
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const mongoose = require('mongoose'); 

//data display
const getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find(); // Assuming User.find() returns the list of users
      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  

//data insert
const addUsers=async(req,res,next)=>{

    const{name,DOB,address,phoneNumber,email,username,password,role}=req.body;

    let users;

    try{
        users=new User({name,DOB,address,phoneNumber,email,username,password,role});
        await users.save();
    }catch(err){
        console.log(err);
    }
    //not insert users
    if(!users){
        return res.status(404).json({message:"unable to add users"});
    }
    return res.status(200).json({users})
};
//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
//update User Details

const updateUser = async (req, res, next) => {
    const id = req.params.id; // Get the user ID from the request parameters
    const { name, DOB, address, phoneNumber, email, username} = req.body; // Destructure user details from the request body
  
    try {
      // Check if the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
  
      // Construct the update object with the provided user details
      const update = {
        name,
        DOB,
        address,
        phoneNumber,
        email,
        username
      
      };
  
      // Find the user by ID and update its details
      const user = await User.findByIdAndUpdate(id, update, { new: true });
  
      // Check if the user exists and return the updated user details
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return the updated user details in the response
      return res.status(200).json({ user });
    } catch (error) {
      console.error("Error updating user details:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
};

//Delete User Details
const deleteUser=async(req,res,next)=>{
    const id=req.params.id;

    let user;
    try{
        user =await User.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"Unable to delete user details"});
    }
    return res.status(200).json({user});
};

// UserControllers.js
const bcrypt = require('bcrypt');

// UserControllers.js

const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token using environment variable JWT_SECRET
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET, // Access JWT_SECRET from environment variables
            { expiresIn: '10h' }
        );
        
        res.status(200).json({
            token: token,
           
            user:user
        });
  
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
         
    }
};

const signUp = async (req, res, next) => {

   
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const {
            name,
            DOB,
            address,
            phoneNumber,
            email,
            username,
            password,
            role
            
        } = req.body;

        const newUser = new User({ name, DOB, address, phoneNumber, email, username, password ,role});
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.getUserDetails=getUserDetails;
exports.getAllUsers=getAllUsers;
exports.addUsers=addUsers;
exports.getById=getById;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;
exports.signIn=signIn;
exports.signUp=signUp;
