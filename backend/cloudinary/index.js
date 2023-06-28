const cloudinary = require("cloudinary").v2
const {CloudinaryStorage} = require("multer-storage-cloudinary")
require("dotenv").config()
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "bakery",
		allowedFormats: ["jpeg", "png", "jpg"],
		public_id: (req, file) => {
			return req.body.item_name // Set public_id as req.body.item_name
		},
	},
})
module.exports = {
	cloudinary,
	storage,
}
