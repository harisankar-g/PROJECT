const express=require('express');
const router=express.Router();
const cartController=require('../Controllers/cartController');

router.get('/:userId',cartController.getCart);
router.post('/add',cartController.addToCart);

module.exports=router;
