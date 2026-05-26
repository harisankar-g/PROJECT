// const Cart = require('../Models/cartModel');

// exports.getCart = async (req, res) => {
//     try {
//         let cart = await Cart.findOne({ userid: req.params.userid })
//             .populate('items.productid');
        
//         if (!cart) {
//             return res.status(200).json({ userid: req.params.userid, items: [], totalBill: 0 });
//         }
        
//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.addToCart = async (req, res) => {
//     const userid = req.body.userId || req.body.userid;
//     const productid = req.body.productId || req.body.productid;
//     const quantity = req.body.quantity || 1;
//     const price = req.body.price || 0;
    
//     try {
//         let cart = await Cart.findOne({ userid });
        
//         if (!cart) {
//             cart = new Cart({ userid, items: [], totalBill: 0 });
//         }
        
//         if (!cart.items) cart.items = [];
        
//         let itemIndex = cart.items.findIndex(
//             item => item.productid && item.productid.toString() === productid
//         );
        
//         if (itemIndex > -1) {
//             cart.items[itemIndex].quantity += quantity;
//         } else {
//             cart.items.push({ productid, quantity, price });
//         }
        
//         cart.totalBill = cart.items.reduce((total, item) => {
//             return total + (item.quantity * (item.price || 0));
//         }, 0);
        
//         await cart.save();
//         await cart.populate('items.productid');
        
//         res.status(201).json(cart);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.removeFromCart = async (req, res) => {
//     const userid = req.params.userid;
//     const productid = req.params.productid;
    
//     try {
//         let cart = await Cart.findOne({ userid });
        
//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }
        
//         cart.items = cart.items.filter(
//             item => item.productid.toString() !== productid
//         );
        
//         cart.totalBill = cart.items.reduce((total, item) => {
//             return total + (item.quantity * item.price);
//         }, 0);
        
//         await cart.save();
//         await cart.populate('items.productid');
        
//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

const Cart = require('../Models/cartModel');

exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userid: req.params.userid })
            .populate('items.productid');

        if (!cart) {
            return res.status(200).json({ userid: req.params.userid, items: [], totalBill: 0 });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addToCart = async (req, res) => {
    const userid = req.body.userId || req.body.userid;
    const productid = req.body.productId || req.params.productid;
    const quantity = req.body.quantity || 1;
    const price = req.body.price || 0; // Ensure price is passed!

    try {
        let cart = await Cart.findOne({ userid });

        if (!cart) {
            cart = new Cart({ userid, items: [], totalBill: 0 });
        }

        if (!cart.items) cart.items = [];

        let itemIndex = cart.items.findIndex(
            item => item.productid && item.productid.toString() === productid
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productid, quantity, price });
        }

        // Recalculate total (use saved price, not req.body.price)
        cart.totalBill = cart.items.reduce((total, item) => {
            return total + (item.quantity * (item.price || 0));
        }, 0);

        await cart.save();
        await cart.populate('items.productid');

        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// NEW: Direct Buy Single Product (No cart needed)
exports.buyNow = async (req, res) => {
    const userid = req.body.userId || req.body.userid;
    const productid = req.body.productId || req.body.productid;
    const quantity = req.body.quantity || 1;
    const price = req.body.price;

    try {
        // Create a temporary cart for this purchase
        const tempCart = {
            userid,
            items: [{ productid, quantity, price }],
            totalBill: price * quantity
        };

        res.status(200).json({
            success: true,
            cart: tempCart,
            message: "Single product ready for payment"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.removeFromCart = async (req, res) => {
    // ... existing code (keep same)
};

// NEW: Clear Cart
exports.clearCart = async (req, res) => {
    try {
        await Cart.deleteOne({ userid: req.params.userid });
        res.status(200).json({ success: true, message: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};