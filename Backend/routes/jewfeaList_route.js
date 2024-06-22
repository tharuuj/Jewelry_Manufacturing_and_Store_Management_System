const express=require("express");
const Router=express.Router();

const Flist=require("../controllers/JewFeaturedList_Controller");


Router.post("/setflist",Flist.setFList);
Router.get("/",Flist.fetchallFlists);
Router.get("/searchflist/:id",Flist.fetchFlistByID);

module.exports=Router