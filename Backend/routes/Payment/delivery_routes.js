const express=require("express");
const Delivery=require('../../controllers/Payment/delivery_controller');
const router = express.Router();

router.post("/newDelivery", Delivery.insertDelivery)
router.post("/changeStatus", Delivery.statusChange)
router.get("/fetchall", Delivery.fetchall)
router.post("/fetchDeliveryClient", Delivery.fetchDeliveryClient)
router.post("/deleteDelivery",Delivery.DeleteDelivery)

module.exports=router;