const express=require("express");
const Router=express.Router();

const shwoCart=require("../controllers/cart");

Router.post('/addtocart/:userId/:productId',shwoCart.addToCart);
Router.get("/fetchcart/:id",shwoCart.getAllCartItems);
Router.delete("/clearCart/:id",shwoCart.clearCart);
Router.delete("/removeProduct/:userId/:productId",shwoCart.removeProducts);
Router.put("/updatePro/:userId/:productId",shwoCart.updateProducts);

module.exports = Router;