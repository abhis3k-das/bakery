const Order = require("../models/Order")
const Product = require("../models/Product")
const User = require("../models/User")
const mongoose = require('mongoose')
module.exports.placeOrder = async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.params.id})
        if(!user){
            return res.status(404).json({"message":"User not found"})
        }
        const {order_placed_for,address,postalCode,phoneNumber,gst,deliveryCost,totalCost,items_list,city,state} = req.body
        if(items_list.length === 0){
            return res.status(400).json({"message":"Cart is Empty"})
        }else{
            items_list.forEach(async(each)=>{
                let item = await Product.findOne({_id:each?.itemId})
                if(!item){
                    return res.status(400).json({"message":`${each?.item_name} does not have a valid Product Id`})
                }
            })
        }
        const addressRegex = /^[A-Za-z0-9-,./ ]+$/
        const pinRegex = /^\d+$/
		const nameRegex = /^[A-Za-z ]+$/
        if(!order_placed_for || order_placed_for.trim().length === 0 || order_placed_for.trim().length > 60 || !nameRegex.test(order_placed_for)){
            return res.status(400).json({"message":"Username cannot be empty and can contain upto 60 characters."})
        }
        if(!address || address.trim().length === 0 ||address.length>200 || !addressRegex.test(address)){
            return res.status(400).json({"message":"Address cannot be empty and it cannot contain more than 200 characters.Alphabets ,numbers,',','.','/' and space allowed "})
        }
        if (!city || city.trim().length === 0 || city.length > 20 || !nameRegex.test(city)) {
            return res.status(400).json({message: "City cannot be empty and length<=20.Only alphabets are allowed."})
        }
    
        if (!state || state.trim().length === 0 || state.length > 20 || !nameRegex.test(state)) {
            return res.status(400).json({message: "State cannot be empty and length<=20.Only alphabets are allowed."})
        }
    
        if (!postalCode || postalCode.toString().length > 10 || !pinRegex.test(postalCode)) {
            return res.status(400).json({message: "Pin cannot be empty and length<=10.Only numbers are allowed."})
        }
    
        if (!phoneNumber || phoneNumber.toString().length !== 10 || !pinRegex.test(phoneNumber)) {
            return res.status(400).json({message: "Phone number cannot be empty and length must be 10.Only nummers are allowed."})
        }
        const newOrder = new Order({
            order_placed_for:order_placed_for,
            order_placed_by:new mongoose.Types.ObjectId(req.params.id),
            order_placed_by_name:`${user.firstName} ${user.lastName}`,
            address:address,
            state:state,
            city:city,
            postalCode:postalCode,
            phoneNumber:phoneNumber,
            gst:gst,
            delivery_cost:deliveryCost,
            total_cost:totalCost,
        })
        items_list.forEach((each)=>{
            newOrder.items_list.push({
                item_id:new mongoose.Types.ObjectId(each.itemId),
                cakeMessage:each.cakeMessage,
                message:each.message,
                selected_item_code:each.selectedWeight,
                quantity:each.quantity,
                item_name:each.item_name,
                item_category:each.item_category,
                cost_of_each_Item:each.cost_of_each,
                total_cost_of_current_item:each.total_cost_of_current_item,
            })
        })
        user.orders.push(newOrder._id);
        await newOrder.save();
        await user.save();
        return res.status(200).json({"message":"order placed successfully"})
    }catch(err){
        return res.status(500).json({"message":"Internal Server Error"})
    }
}

module.exports.getOrders = async(req,res)=>{
    try{
        const orderList = await Order.find({order_placed_by:req.params.id});
        return res.status(200).json({"message":"Success",orderList})
    }catch(err){
        return res.status(500).json({"message":"Internal Server Error"})
    }
}