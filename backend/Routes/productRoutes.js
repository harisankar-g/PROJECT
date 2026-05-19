const express = require('express');
const router = express.Router();

//  Import deleteWarranty from deleteWarranty.js
const { deleteWarranty } = require('../controllers/deleteWarranty');  // Fixed path

// Product controller functions (NO deleteWarranty here!)
const { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');  //  Removed duplicate deleteWarranty

// --- Routes ---
router.post('/create', createProduct); 
router.get('/all', getAllProducts);
router.get('/:id', getProductById);
router.put('/update/:id', updateProduct);
router.delete('/delete/product/:id', deleteProduct);  //  Different path

//  Warranty delete (different endpoint)
router.delete('/delete/warranty/:id', deleteWarranty);  //  Clear path!

module.exports = router;