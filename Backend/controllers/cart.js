// controllers/cart.js
// Controller to add a product to the cart
const Cart = require('../models/cart');
const ShowProduct = require("../models/showcaseProduct_model");
const ReadyMadeProduct = require("../models/readyMadeProducts_model");

exports.addToCart = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    let initialTot;
  
    try {
        let cart = await Cart.findOne({ userId });
  
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
  
        const existingProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  
        if (existingProductIndex !== -1) {
            // If product already exists in the cart, update its quantity
            cart.items[existingProductIndex].quantity += 1;
        } else {
            // If product is not in the cart, add it to the cart
            const product = await ShowProduct.findById(productId).populate('Item');
            const price = product.Item ? product.Item.item_price : 0;
            cart.items.push({ productId, quantity: 1, price }); // Add quantity field with value 1
            
        }
  
        // Calculate total price
        let totalPrice = 0;
        for (const item of cart.items) {
            totalPrice += item.price * item.quantity; 
        }
        cart.totalPrice = totalPrice || 0; // Set totalPrice to 0 if calculation results in NaN
  
        await cart.save();
  
        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



exports.updateProducts = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productToUpdate = cart.items.find(item => item.productId.toString() === productId);

        if (!productToUpdate) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        productToUpdate.quantity = quantity;

        // Calculate total price
        let totalPrice = 0;
        for (const item of cart.items) {
            const product = await ShowProduct.findById(item.productId).populate('Item');
            totalPrice += product.Item ? product.Item.item_price * item.quantity : 0;
        }
        cart.totalPrice = totalPrice;

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to fetch all cart items for a user
exports.getAllCartItems = async (req, res) => {
    const userId = req.params.id;

    try {
        const cart = await Cart.findOne({ userId }).populate({ path: 'items.productId', populate: { path: 'Item' } });
         
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
       
        // Calculate total price
        let totalPrice = 0;
        for (const item of cart.items) {
            if(!item.productId){
               
                cart.items = cart.items.filter(Item => Item._id !== item._id);
               await cart.save();
               

            }
            else{
            totalPrice += item.productId.Item ? item.productId.Item.item_price * item.quantity : 0;}
        }
        cart.totalPrice = totalPrice;

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Controller to clear the cart for a user
exports.clearCart = async (req, res) => {
    const userId = req.params.id;

    try {
        await Cart.findOneAndDelete({ userId });

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.removeProducts = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const initialTotalPrice = cart.totalPrice;

        // Remove the product from the cart items
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        // Calculate total price after removing the product
        let totalPrice = 0;
        for (const item of cart.items) {
            const product = await ShowProduct.findById(item.productId);
            totalPrice += product.price * item.quantity; // Assuming there's a price field in the ShowProduct model
        }

        // Set the total price to 0 if totalPrice calculation results in NaN
        cart.totalPrice = isNaN(totalPrice) ? 0 : totalPrice;

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

