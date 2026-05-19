
const product = require('../Models/productModel');
const Counter = require('../Models/counterModel');
// const Warranty = require('../Models/Warranty');

// 1. CREATE
const createProduct = async (req, res) => {
    const {
        product_name,
        product_brand,
        product_price,
        product_quantity,
        product_size,
        product_color
    } = req.body;

    try {
        //  FETCH THE COUNTER FIRST ---
        const Counter = await Counter.findOneAndUpdate(
            { id: 'product_id' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const newProduct = new product({
            product_id: Counter.seq, // Now counter.seq exists!
            product_name,
            product_brand,
            product_price,
            product_quantity,
            product_size,
            product_color
        });

        await newProduct.save();
        res.status(200).json({ msg: "Product created successfully", data: newProduct });
    } catch (error) {
        res.status(500).json({ msg: "Server error", e: error.message });
    }
};

// 2. READ (ALL)
const getAllProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ msg: "Server error", e: error.message });
    }
};

// 3. READ (SINGLE)
const getProductById = async (req, res) => {
    try {
        const item = await product.findOne({ product_id: req.params.id });
        if (!item) return res.status(404).json({ msg: "Product not found" });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ msg: "Server error", e: error.message });
    }
};

// 4. UPDATE
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await product.findOneAndUpdate(
            { product_id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({ msg: "Updated successfully", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ msg: "Server error", e: error.message });
    }
};

// 5. DELETE
const deleteProduct = async (req, res) => {
    try {
        const deleted = await product.findOneAndDelete({ product_id: req.params.id });
        if (!deleted) return res.status(404).json({ msg: "Product not found" });
        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", e: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct  
};