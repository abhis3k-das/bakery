const User = require('../models/User')
const Product = require("../models/Product")
const Review = require("../models/Reviews")
const mongoose = require('mongoose')
module.exports.addNewReview =  async (req, res) => {
	const user = await User.findOne({_id: req.body.user_Id})
	const product = await Product.findOne({_id: req.body.product_Id})
	if (!user) {
		return res.status(404).json({message: "User does not exist"})
	}
	if (!product) {
		return res.status(404).json({message: "Product does not exist"})
	}
	try {
		const newReview = new Review({
			review: req.body.review,
			user_Id: new mongoose.Types.ObjectId(req.body.user_Id),
			product_Id: new mongoose.Types.ObjectId(req.body.product_Id),
			rating: req.body.rating,
			occation: req.body.occation,
			posted_By: `${user.firstName} ${user.lastName}`,
			from: req.body.state,
		})
		const response = await newReview.save()
		product.reviews.push(response._id)
		const updatedData = await (
			await product.save()
		).populate({
			path: "reviews",
			options: {sort: {posted_On: -1}},
		})

		return res.status(200).json({message: "Review Added", updatedData})
	} catch (e) {
		console.log(e)
		return res.status(500).json({message: "Failed to Create Review"})
	}
}

module.exports.updatedReview = async (req, res) => {
	const user = await User.findOne({_id: req.body.user_Id})
	const review = await Review.findOne({_id:req.body.review_Id})
	if (!user) {
		return res.status(404).json({message: "User does not exist"})
	}
	if (!review) {
		return res.status(404).json({message: "Review does not exist"})
	}
	if(!user._id.equals(review.user_Id)){
		return res.status(500).json({"message":"Only the review owner is allowed to make changes"})
	}
	const updatedReview = await Review.findOneAndUpdate(
		{_id: req.body.review_Id},
		{
			review: req.body.review,
			rating: req.body.rating,
			occation: req.body.occation,
			posted_By: `${user.firstName} ${user.lastName}`,
			from: req.body.state,
		},{
			new:true,
		}
	)
	const updatedData = await Product.findOne({_id: req.body.product_Id}).populate({
		path:"reviews",
		options: {sort: {posted_On: -1}},
	})
	return res.status(200).json({"message": "Review updated",updatedData})
}

module.exports.deleteReview = async(req,res)=>{
	const user = await User.findOne({_id:req.body.user_Id})
	const review = await Review.findOne({_id:req.params.id})
	if(!user){
		return res.status(404).json({"message":"User not found"})
	}
	if(!review){
		return res.status(404).json({"message":"Review not found"})
	}
	if(!user._id.equals(review.user_Id)){
		return res.status(500).json({"message":"Only review owner is allowed to delete review"})
	}
	const updatedData = await Product.findOneAndUpdate({_id:review.product_Id},{ $pull: { reviews: review._id }},{new:true}).populate({
		path:"reviews",
		options:{sort:{posted_On:-1}}
	})
	await Review.findOneAndDelete({_id:req.params.id})

	return res.status(200).json({"message":"review deleted",updatedData})
}