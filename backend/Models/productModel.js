const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // ADD THIS FIELD:
    product_id: { 
        type: Number, 
        unique: true 
    },
    product_name: { type: String, required: true },
    product_brand: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_size: { type: String, required: true },
    product_color: { type: String, required: true },
    product_warranty: { type: String, required: true}
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;