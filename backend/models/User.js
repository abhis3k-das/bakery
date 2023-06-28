const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        minLength:3,
        maxLength:30,
    },
    lastName:{
        type:String,
        maxLength:30,
    },
    address_1:{
        type:String,
        maxLength:200,
    },
    address_2:{
        type:String,
        maxLength:200,
    },
    state:{
        type:String,
    },
    postalCode:{
        type:Number,
        maxLength:10,
    },
    phoneNumber:{
        type:Number,
        maxLength:10,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    refreshTokens:[String],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ],
    cart:[
        {
            type:Object,
            default:{},
        }
    ]
});

const User = mongoose.model('User',userSchema);
module.exports = User;