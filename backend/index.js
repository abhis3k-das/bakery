const express = require("express")
const app = express()
const cors = require("./cors/index")
const cookieParser = require("cookie-parser")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const multer = require("multer")
// const {storage} = require("./cloudinary")
// const upload = multer({storage})
const mongoose = require("mongoose")
const User = require("./models/User")
// const Product = require("./models/Product")
// const Review = require("./models/Reviews")
const mongoUrl = process.env.MONGOOSE_URL
const PORT = process.env.PORT || 8000
require("dotenv").config()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true)
	next()
})
app.use(cors)
mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Successfully connected to Bakery")
	})
	.catch((err) => {
		console.log("Failed to conned to Bakery")
	})
const userRoutes = require('./routes/user')
const productsRoutes = require('./routes/products')
const reviewRoutes = require("./routes/reviews")
const orderRoutes = require('./routes/orders')
app.use("/",userRoutes);
app.use("/",productsRoutes);
app.use("/",reviewRoutes);
app.use("/",orderRoutes);
// const verifyJWT = (req, res, next) => {
// 	const authHeader = req.headers["authorization"] || req.headers["Authorization"]
// 	console.log(req.headers["authorization"])
// 	if (!authHeader) {
// 		return res.status(401).json({message: "UnAuthorized Header Missing"})
// 	}
// 	const token = authHeader.split(" ")[1]
// 	console.log(token)
// 	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
// 		if (err) {
// 			return res.status(403).json({message: "You are not Logged In"})
// 		}
// 		req.email = decoded.email
// 		next()
// 	})
// }
// app.post("/register", async (req, res) => {
// 	const {fname, lname, add_1, add_2, state, city, pin, password, phNo, email} = req.body
// 	if (!fname || !add_1 || !state || !city || !password || !phNo || !email) {
// 		return res.status(400).json({message: "Invalid Data Received"})
// 	}
// 	const nameRegex = /^[A-Za-z]+$/
// 	const addressRegex = /^[A-Za-z0-9-,./ ]+$/
// 	const pinRegex = /^\d+$/
// 	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// 	const passwordRegex = /^[A-Za-z]\w{7,14}$/
// 	if (!fname || fname.length < 3 || fname.length > 30 || !nameRegex.test(fname)) {
// 		return res.status(400).json({message: "First name must contain characters from A-Z and a-z and length must be >=3 and <= 30"})
// 	}

// 	if (lname && (lname.length > 30 || !nameRegex.test(lname))) {
// 		return res.status(400).json({message: "Last name must contain characters from A-Z and a-z and length must be <= 30"})
// 	}

// 	if (!add_1 || add_1.length > 200 || !addressRegex.test(add_1)) {
// 		return res.status(400).json({message: "Address cannot be empty and length must be <= 200. Allowed char 0-9,A-Z,a-z,-,.,/ and space"})
// 	}

// 	if (add_2 && (add_2.length > 200 || !addressRegex.test(add_2) || add_1 === add_2)) {
// 		return res.status(400).json({message: "Address cannot be empty or same as address 1 and length must be <= 200. Allowed char 0-9,A-Z,a-z,-,.,/ and space"})
// 	}

// 	if (!city || city.length > 20 || !nameRegex.test(city)) {
// 		return res.status(400).json({message: "City cannot be empty and length<=20.Only alphabets are allowed."})
// 	}

// 	if (!state || state.length > 20 || !nameRegex.test(state)) {
// 		return res.status(400).json({message: "State cannot be empty and length<=20.Only alphabets are allowed."})
// 	}

// 	if (!pin || pin.length > 10 || !pinRegex.test(pin)) {
// 		return res.status(400).json({message: "Pin cannot be empty and length<=10.Only numbers are allowed."})
// 	}

// 	if (!phNo || phNo.length !== 10 || !pinRegex.test(phNo)) {
// 		return res.status(400).json({message: "Phone number cannot be empty and length must be 10.Only nummers are allowed."})
// 	}

// 	if (!email || email.length > 80 || !emailRegex.test(email)) {
// 		return res.status(400).json({message: "Invalid email.Allowed length is 20."})
// 	}
// 	if (password.length < 7 || password.length > 14 || !passwordRegex.test(password)) {
// 		return res.status(400).json({message: "Password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter"})
// 	}
// 	const hashedPassword = await bcrypt.hash(password, 10)
// 	const user = await User.findOne({email: email})
// 	if (user) {
// 		return res.status(409).json({message: "User registered with given mail."})
// 	}
// 	const newUser = new User({
// 		firstName: fname,
// 		lastName: lname,
// 		address_1: add_1,
// 		address_2: add_2,
// 		state: state,
// 		city: city,
// 		postalCode: pin,
// 		email: email,
// 		password: hashedPassword,
// 	})
// 	await newUser.save()
// 	return res.status(200).json({"message": "Registered Successfully"})
// })
// app.post("/login", async (req, res) => {
// 	const {email, password} = req.body
// 	if (!email || !password) {
// 		return res.status(400).json({message: "email and Password required"})
// 	}
// 	const user = await User.findOne({email: email})
// 	if (!user) {
// 		return res.status(401).json({message: "UnAuthorized (User)"})
// 	}
// 	const compare = await bcrypt.compare(password, user.password)
// 	if (!compare) {
// 		return res.status(401).json({message: "UnAuthorized (Password)"})
// 	}
// 	const refreshToken = jwt.sign({email: email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "15m"})
// 	const accessToken = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15s"}) //30m-minutes 1w-week 1h-hour
// 	user.refreshTokens.push(refreshToken)
// 	await user.save()
// 	res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true})
// 	return res.status(200).json({message: "Logged In", accessToken, user: user._id})
// })
// app.get("/refresh", async (req, res) => {
// 	const cookies = req.cookies
// 	const refreshToken = cookies?.jwt
// 	const user = await User.findOne({refreshTokens: refreshToken})
// 	if (!user) {
// 		return res.status(403).json({message: "Wrong Tokken Forbidden"})
// 	}
// 	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
// 		if (err || user.email !== decoded.email) {
// 			return res.status(403).json({message: "User/Token didnt Match Forbidden"})
// 		}
// 		const accessToken = jwt.sign({username: decoded.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15s"})
// 		return res.status(200).json({message: "New Token Generated", accessToken, user: user._id})
// 	})
// })
// app.get("/logout", verifyJWT, async (req, res) => {
// 	const cookie = req.cookies
// 	if (!cookie?.jwt) {
// 		return res.status(204).json({message: "Not logged In"})
// 	}
// 	const refreshToken = cookie?.jwt
// 	const user = await User.findOne({refreshTokens: refreshToken})
// 	res.clearCookie("jwt", {httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true})
// 	if (!user) {
// 		return res.status(403).json({message: "Tokken not found In Db / relogin"})
// 	}
// 	user.refreshTokens = user.refreshTokens.filter((each) => each !== refreshToken)
// 	await user.save()
// 	return res.status(204).json({message: "Logged out and Tokken Cleared"})
// })
// app.post("/addNewProduct", upload.array("image"), async (req, res) => {
// 	console.log(req.body, req.files)
// 	let {item_name, description, weightObject, priceObject, quantityObject, category} = req.body
// 	weightObject = JSON.parse(weightObject)
// 	quantityObject = JSON.parse(quantityObject)
// 	priceObject = JSON.parse(priceObject)
// 	try {
// 		const newProduct = new Product({
// 			item_name,
// 			description,
// 			category,
// 			image: {
// 				url: req.files[0].path,
// 				original_name: req.files[0].originalname,
// 				current_filename: req.files[0].filename,
// 			},
// 			weight: weightObject,
// 			availability: quantityObject,
// 			price: priceObject,
// 		})
// 		await newProduct.save()
// 		res.status(200).json({message: "added new product"})
// 	} catch (e) {
// 		res.status(500).json({message: "Failed to add new product"})
// 	}
// })
// app.get("/getProducts", async (req, res) => {
// 	const response = await Product.find().populate({
// 		path: "reviews",
// 		options: {sort: {posted_On: -1}},
// 	})
// 	if (!response) {
// 		return res.status(500).json({message: "Failed to get Products"})
// 	}
// 	return res.status(200).json({message: "Products fetched", products: response})
// })
// app.post("/addReview", verifyJWT, async (req, res) => {
// 	console.log(req.body)
// 	const user = await User.findOne({_id: req.body.user_Id})
// 	const product = await Product.findOne({_id: req.body.product_Id})
// 	if (!user) {
// 		return res.status(404).json({message: "User does not exist"})
// 	}
// 	if (!product) {
// 		return res.status(404).json({message: "Product does not exist"})
// 	}
// 	try {
// 		const newReview = new Review({
// 			review: req.body.review,
// 			user_Id: new mongoose.Types.ObjectId(req.body.user_Id),
// 			product_Id: new mongoose.Types.ObjectId(req.body.product_Id),
// 			rating: req.body.rating,
// 			occation: req.body.occation,
// 			posted_By: `${user.firstName} ${user.lastName}`,
// 			from: req.body.state,
// 		})
// 		const response = await newReview.save()
// 		product.reviews.push(response._id)
// 		const updatedData = await (
// 			await product.save()
// 		).populate({
// 			path: "reviews",
// 			options: {sort: {posted_On: -1}},
// 		})

// 		return res.status(200).json({message: "Review Added", updatedData})
// 	} catch (e) {
// 		console.log(e)
// 		return res.status(500).json({message: "Failed to Create Review"})
// 	}
// })
// app.post("/updateReview", verifyJWT, async (req, res) => {
// 	const user = await User.findOne({_id: req.body.user_Id})
// 	const review = await Review.findOne({_id:req.body.review_Id})
// 	if (!user) {
// 		return res.status(404).json({message: "User does not exist"})
// 	}
// 	if (!review) {
// 		return res.status(404).json({message: "Review does not exist"})
// 	}
// 	if(!user._id.equals(review.user_Id)){
// 		return res.status(500).json({"message":"Only the review owner is allowed to make changes"})
// 	}
// 	const updatedReview = await Review.findOneAndUpdate(
// 		{_id: req.body.review_Id},
// 		{
// 			review: req.body.review,
// 			rating: req.body.rating,
// 			occation: req.body.occation,
// 			posted_By: `${user.firstName} ${user.lastName}`,
// 			from: req.body.state,
// 		},{
// 			new:true,
// 		}
// 	)
// 	const updatedData = await Product.findOne({_id: req.body.product_Id}).populate({
// 		path:"reviews",
// 		options: {sort: {posted_On: -1}},
// 	})
// 	return res.status(200).json({"message": "Review updated",updatedData})
// })
// app.delete("/review/:id",verifyJWT,async(req,res)=>{
// 	console.log("herer",req.body)
// 	console.log(req.params.id)
// 	const user = await User.findOne({_id:req.body.user_Id})
// 	const review = await Review.findOne({_id:req.params.id})
// 	if(!user){
// 		return res.status(404).json({"message":"User not found"})
// 	}
// 	if(!review){
// 		return res.status(404).json({"message":"Review not found"})
// 	}
// 	if(!user._id.equals(review.user_Id)){
// 		return res.status(500).json({"message":"Only review owner is allowed to delete review"})
// 	}
// 	const updatedData = await Product.findOneAndUpdate({_id:review.product_Id},{ $pull: { reviews: review._id }},{new:true}).populate({
// 		path:"reviews",
// 		options:{sort:{posted_On:-1}}
// 	})
// 	await Review.findOneAndDelete({_id:req.params.id})

// 	return res.status(200).json({"message":"review deleted",updatedData})
// })
app.get("/data", async (req, res) => {
	const dataList = await User.find()
	res.send(dataList)
})
app.all("*", (req, res) => {
	return res.status(404).json({message: "Page Not Found"})
})
app.listen(PORT, () => {
	console.log("Connected to Port 8000")
})
