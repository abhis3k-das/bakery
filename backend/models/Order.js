const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    items:[
        {
            item:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
            },
            item_price:Number,
            total_item_price:Number,
            item_Code:String,
            quantity:Number,
        }
    ],
    final_cost:Number,
    ordered_On:{
        type:Date,
        default:Date.now,
    },
    ordered_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    delivery_address:String,
})

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;