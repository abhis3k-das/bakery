const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    item_name:String,
    description:String,
    category:{
        type:String,
        enum:["cake","cookie","bread","dairy"]
    },
    veg:{
        type:String,
        enum:["Yes","No"]
    },
    image:[{
        url:String,
        original_name:String,
        current_filename:String,
    }],
    overallRating:Number,
    weight:{
        type:Object,
        default:{},
    },
    price:{
        type:Object,
        default:{},
    },
    availability:{
        type:Object,
        default:{},
    },
    reviews:[
        {   
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
})
const Product = mongoose.model('Product',productSchema);
module.exports = Product;