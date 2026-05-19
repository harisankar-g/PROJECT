const Cart = require('../Models/cartModel');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userid: req.params.userid })
            .populate('items.productid');
        
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (err) {
        console.log('GET CART ERROR:', err); 
        res.status(500).json({ message: err.message });
    }
};

exports.addToCart = async (req, res) => {
    const { userid, productid, quantity, price } = req.body;
    
    try {
        console.log('Adding to cart:', { userid, productid, quantity, price }); 
        
        let cart = await Cart.findOne({ userid });
        
        if (cart) {
            // Safety check for items array
            if (!cart.items) cart.items = [];
            if (!Array.isArray(cart.items)) cart.items = [];
            
            // Find product index SAFELY
            let itemIndex = -1;
            cart.items.forEach((item, index) => {
                if (item.productid && item.productid.toString() === productid) {
                    itemIndex = index;
                }
            });
            
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productid, quantity, price });
            }
            
            // Safe total calculation
            cart.totalBill = cart.items.reduce((total, item) => {
                return total + (item.quantity * item.price || 0);
            }, 0);
            
            cart = await cart.save();
            await cart.populate('items.productid');
            
            res.status(201).json(cart);
        } else {
            const newCart = await Cart.create({
                userid,
                items: [{ productid, quantity, price }],
                totalBill: quantity * price
            });
            res.status(201).json(newCart);
        }
    } catch (err) {
        console.log('ADD TO CART ERROR:', err); 
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};