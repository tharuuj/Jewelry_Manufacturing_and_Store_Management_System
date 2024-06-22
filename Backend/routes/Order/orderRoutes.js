const express = require("express");
const router = express.Router();

//insert model
const Order = require("../../models/Order/Order");

///////////////////////////////////////////////All user controllers////////////////////////////////////////////////////

const OrderController = require("../../controllers/Order/OrderController");

router.get("/",OrderController.getAllOrders); //display
router.post("/",OrderController.addOrders); //insert
router.get("/:id",OrderController.getById);
router.put("/:id",OrderController.updateOrder); //update
router.delete("/:id",OrderController.deleteOrder); //update

//export
module.exports = router;
