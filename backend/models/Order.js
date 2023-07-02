const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    order_placed_for:String,
    order_placed_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    order_placed_by_name:String,
    state:String,
    city:String,
    address:String,
    postalCode:Number,
    phoneNumber:Number,
    gst:Number,
    delivery_cost:Number,
    total_cost:Number,
    ordered_On:{
        type:Date,
        default:Date.now,
    },

    items_list:[
        {
            item_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
            },
            cakeMessage:String,
            message:String,
            selected_item_code:String,
            quantity:Number,
            item_name:String,
            item_category:String,
            cost_of_each_Item:Number,
            total_cost_of_current_item:Number,
        }
    ],
    
})

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;