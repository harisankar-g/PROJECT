// backend/Controllers/cartController.js
const Cart = require('../Models/cartModel');

// GET CART
exports.getCart = async (req, res) => {
    try {
        const { userid } = req.params;
        
        let cart = await Cart.findOne({ userid })
            .populate('items.productid');

        if (!cart) {
            return res.status(200).json({ 
                success: true,
                userid, 
                items: [], 
                totalBill: 0 
            });
        }

        // Recalculate total bill (in case of any mismatch)
        const totalBill = cart.items.reduce((total, item) => {
            return total + (item.quantity * item.price);
        }, 0);

        res.status(200).json({
            success: true,
            userid: cart.userid,
            items: cart.items,
            totalBill
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ADD TO CART
exports.addToCart = async (req, res) => {
    const userid = req.body.userId || req.body.userid;
    const productid = req.body.productId || req.body.productid;
    const quantity = parseInt(req.body.quantity) || 1;
    const price = parseFloat(req.body.price) || 0;

    if (!userid || !productid || price <= 0) {
        return res.status(400).json({ 
            message: 'userId, productId and price are required' 
        });
    }

    try {
        let cart = await Cart.findOne({ userid });

        if (!cart) {
            // Create new cart
            cart = new Cart({ 
                userid, 
                items: [], 
                totalBill: 0 
            });
        }

        if (!cart.items) cart.items = [];

        // Check if product already in cart
        let itemIndex = cart.items.findIndex(
            item => item.productid && item.productid.toString() === productid
        );

        if (itemIndex > -1) {
            // Update existing item quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({ productid, quantity, price });
        }

        // Recalculate total bill
        cart.totalBill = cart.items.reduce((total, item) => {
            return total + (item.quantity * item.price);
        }, 0);

        await cart.save();
        await cart.populate('items.productid');

        res.status(201).json({
            success: true,
            message: 'Added to cart',
            cart
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// REMOVE FROM CART
exports.removeFromCart = async (req, res) => {
    const userid = req.params.userid;
    const productid = req.params.productid;

    try {
        let cart = await Cart.findOne({ userid });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove item
        cart.items = cart.items.filter(
            item => item.productid && item.productid.toString() !== productid
        );

        // Recalculate total bill
        cart.totalBill = cart.items.reduce((total, item) => {
            return total + (item.quantity * item.price);
        }, 0);

        await cart.save();
        await cart.populate('items.productid');

        res.status(200).json({
            success: true,
            message: 'Removed from cart',
            cart
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// BUY NOW (Single Product)
exports.buyNow = async (req, res) => {
    const userid = req.body.userId || req.body.userid;
    const productid = req.body.productId || req.body.productid;
    const quantity = parseInt(req.body.quantity) || 1;
    const price = parseFloat(req.body.price);

    try {
        const tempCart = {
            userid,
            items: [{ productid, quantity, price }],
            totalBill: price * quantity
        };

        res.status(200).json({
            success: true,
            message: 'Single product ready for payment',
            cart: tempCart
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CLEAR CART
exports.clearCart = async (req, res) => {
    const { userid } = req.params;

    try {
        await Cart.deleteOne({ userid });
        
        res.status(200).json({ 
            success: true, 
            message: 'Cart cleared successfully' 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};