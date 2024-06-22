const express=require("express");
const Router=express.Router();

const Showcat=require("../controllers/ShowcaseCat_Controller");


Router.post("/setcat",Showcat.setShowCat);
Router.get("/",Showcat.fetchallCategories);
Router.get("/searchcat/:id",Showcat.fetchCatByID);

module.exports=Router