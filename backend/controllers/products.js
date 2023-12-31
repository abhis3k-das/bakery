const Product = require('../models/Product');
module.exports.addNewProducts = async (req, res) => {
	let {item_name, description, weightObject, priceObject, quantityObject, category} = req.body
	item_name = decodeURIComponent(item_name)
	description = decodeURIComponent(description)
	weightObject = JSON.parse(weightObject)
	quantityObject = JSON.parse(quantityObject)
	priceObject = JSON.parse(priceObject)
	try {
		const newProduct = new Product({
			item_name,
			description,
			category,
			image: {
				url: req.files[0].path,
				original_name: req.files[0].originalname,
				current_filename: req.files[0].filename,
			},
			weight: weightObject,
			availability: quantityObject,
			price: priceObject,
		})
		const response = await newProduct.save()
		console.log("--------------",JSON.stringify(response))
		res.status(200).json({message: "added new product"})
	} catch (e) {
		if (e.code === 11000){
			return res.status(409).json({"message":`Item  "${e.keyValue.item_name}" is already present`,"status":409})
		}
		return res.status(500).json({message: "Failed to add new product"})
	}
}

module.exports.getAllProducts = async (req, res) => {
	const response = await Product.find().populate({
		path: "reviews",
		options: {sort: {posted_On: -1}},
	})
	if (!response) {
		return res.status(500).json({message: "Failed to get Products"})
	}
	return res.status(200).json({message: "Products fetched", products: response})
}