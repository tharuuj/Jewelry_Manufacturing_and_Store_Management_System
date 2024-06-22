const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist_controller');

router.get('/:userId', wishlistController.getAllWishlistItems);

router.post('/:userId/addItem', wishlistController.addItemToWishlist);

router.delete('/:userId/removeItem/:itemId', wishlistController.removeItemFromWishlist);

module.exports = router;
