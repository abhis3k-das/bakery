const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/User")
module.exports.signUp = async (req, res) => {
	const {fname, lname, add_1, add_2, state, city, pin, password, phNo, email} = req.body
	if (!fname || !add_1 || !state || !city || !password || !phNo || !email) {
		return res.status(400).json({message: "Invalid Data Received"})
	}
	const nameRegex = /^[A-Za-z]+$/
	const addressRegex = /^[A-Za-z0-9-,./ ]+$/
	const pinRegex = /^\d+$/
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	const passwordRegex = /^[A-Za-z]\w{7,14}$/
	if (!fname || fname.length < 3 || fname.length > 30 || !nameRegex.test(fname)) {
		return res.status(400).json({message: "First name must contain characters from A-Z and a-z and length must be >=3 and <= 30"})
	}

	if (lname && (lname.length > 30 || !nameRegex.test(lname))) {
		return res.status(400).json({message: "Last name must contain characters from A-Z and a-z and length must be <= 30"})
	}

	if (!add_1 || add_1.length > 200 || !addressRegex.test(add_1)) {
		return res.status(400).json({message: "Address cannot be empty and length must be <= 200. Allowed char 0-9,A-Z,a-z,-,.,/ and space"})
	}

	if (add_2 && (add_2.length > 200 || !addressRegex.test(add_2) || add_1 === add_2)) {
		return res.status(400).json({message: "Address cannot be empty or same as address 1 and length must be <= 200. Allowed char 0-9,A-Z,a-z,-,.,/ and space"})
	}

	if (!city || city.length > 20 || !nameRegex.test(city)) {
		return res.status(400).json({message: "City cannot be empty and length<=20.Only alphabets are allowed."})
	}

	if (!state || state.length > 20 || !nameRegex.test(state)) {
		return res.status(400).json({message: "State cannot be empty and length<=20.Only alphabets are allowed."})
	}

	if (!pin || pin.length > 10 || !pinRegex.test(pin)) {
		return res.status(400).json({message: "Pin cannot be empty and length<=10.Only numbers are allowed."})
	}

	if (!phNo || phNo.length !== 10 || !pinRegex.test(phNo)) {
		return res.status(400).json({message: "Phone number cannot be empty and length must be 10.Only nummers are allowed."})
	}

	if (!email || email.length > 80 || !emailRegex.test(email)) {
		return res.status(400).json({message: "Invalid email.Allowed length is 20."})
	}
	if (password.length < 7 || password.length > 14 || !passwordRegex.test(password)) {
		return res.status(400).json({message: "Password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter"})
	}
	const hashedPassword = await bcrypt.hash(password, 10)
	const user = await User.findOne({email: email})
	if (user) {
		return res.status(409).json({message: "User registered with given mail."})
	}
	const newUser = new User({
		firstName: fname,
		lastName: lname,
		address_1: add_1,
		address_2: add_2,
		state: state,
		city: city,
		postalCode: pin,
		email: email,
		password: hashedPassword,
	})
	await newUser.save()
	return res.status(200).json({message: "Registered Successfully"})
}

module.exports.logIn = async (req, res) => {
	const {email, password} = req.body
	if (!email || !password) {
		return res.status(400).json({message: "email and Password required"})
	}
	const user = await User.findOne({email: email})
	if (!user) {
		return res.status(401).json({message: "UnAuthorized (User)"})
	}
	const compare = await bcrypt.compare(password, user.password)
	if (!compare) {
		return res.status(401).json({message: "UnAuthorized (Password)"})
	}
	const refreshToken = jwt.sign({email: email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "15m"})
	const accessToken = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15s"}) //30m-minutes 1w-week 1h-hour
	user.refreshTokens.push(refreshToken)
	await user.save()
	res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true})
	return res.status(200).json({message: "Logged In", accessToken, user: user._id})
}

module.exports.autoRelogin = async (req, res) => {
	const cookies = req.cookies
	const refreshToken = cookies?.jwt
	const user = await User.findOne({refreshTokens: refreshToken})
	if (!user) {
		return res.status(403).json({message: "Wrong Tokken Forbidden"})
	}
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || user.email !== decoded.email) {
			return res.status(403).json({message: "User/Token didnt Match Forbidden"})
		}
		const accessToken = jwt.sign({username: decoded.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15s"})
		return res.status(200).json({message: "New Token Generated", accessToken, user: user._id})
	})
}

module.exports.logOut = async (req, res) => {
	const cookie = req.cookies
	if (!cookie?.jwt) {
		return res.status(204).json({message: "Not logged In"})
	}
	const refreshToken = cookie?.jwt
	const user = await User.findOne({refreshTokens: refreshToken})
	res.clearCookie("jwt", {httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true})
	if (!user) {
		return res.status(403).json({message: "Tokken not found In Db / relogin"})
	}
	user.refreshTokens = user.refreshTokens.filter((each) => each !== refreshToken)
	await user.save()
	return res.status(204).json({message: "Logged out and Tokken Cleared"})
}