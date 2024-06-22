const express=require("express");
const Router=express.Router();

const cusrate=require("../controllers/customerShowrate_Controller");


Router.post("/setrate",cusrate.setShowrates);
Router.get("/",cusrate.fetchrate);
Router.get("/:rId",cusrate.fetchrateByID);
Router.get("/showrate/deleterate/:rId",cusrate.deleteRate);
Router.put("/showratr/updaterate/:rId",cusrate.updaterate);

module.exports=Router