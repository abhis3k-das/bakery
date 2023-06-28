const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    occation:String,
    review:String,
    rating:Number,
    from:String,
    posted_On:{
        type:Date,
        default:Date.now,
    },
    posted_By:String,
    user_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    product_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }
})

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;