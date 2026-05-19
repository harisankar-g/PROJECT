const mongoose=require('mongoose')
const cartSchema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
        
    },
    items:[{
        productid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            min:[1,'Quantity cannot be less than 1.'],
            default:1
        },
        price:{type:Number,
            required:true
        }
    }],
    totalBill:{
        type:Number,
        required:true,
        default:0
    }
});
module.exports=mongoose.model('Cart',cartSchema);