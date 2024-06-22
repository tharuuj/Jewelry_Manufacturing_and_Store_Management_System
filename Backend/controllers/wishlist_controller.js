const Wishlist = require('../models/wishlist_model');

// Controller to fetch all wishlist items for a user
exports.getAllWishlistItems = async (req, res) => {
    const userId = req.params.userId;

    try {
        const wishlist = await Wishlist.findOne({ user: userId }).populate('wishlistItems.product');

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        for (const wishlistitem of wishlist.wishlistItems){
         if(!wishlistitem.product){

            wishlist.wishlistItems = wishlist.wishlistItems.filter(item => item._id !== wishlistitem._id);
      
            await wishlist.save();
            

        }}
        res.status(200).json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to add an item to the wishlist
exports.addItemToWishlist = async (req, res) => {
    const userId = req.params.userId;
    const { productId } = req.body;

    try {
        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            // Create a new wishlist if not exists
            wishlist = new Wishlist({ user: userId, wishlistItems: [{ product: productId }] });
            await wishlist.save();
            res.status(201).json(wishlist);
        } else {
            // Check if the item already exists in the wishlist
            const existingItemIndex = wishlist.wishlistItems.findIndex(item => item.product.toString() === productId.toString());
            if (existingItemIndex !== -1) {
                // Item already exists in the wishlist
                return res.status(400).json({ message: 'Item already exists in the wishlist' });
            } else {
                // Add item to existing wishlist
                wishlist.wishlistItems.push({ product: productId });
                await wishlist.save();
                res.status(201).json(wishlist);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Controller to remove an item from the wishlist by itemId
exports.removeItemFromWishlist = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;

    try {
        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        // Remove the item from wishlistItems array
        wishlist.wishlistItems = wishlist.wishlistItems.filter(item => item._id.toString() !== itemId);
        await wishlist.save();

        res.status(200).json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
