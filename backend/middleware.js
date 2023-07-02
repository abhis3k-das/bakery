const jwt = require("jsonwebtoken")
require("dotenv").config()
module.exports.verifyJWT = (req, res, next) => {
	try{

		const authHeader = req.headers["authorization"] || req.headers["Authorization"]
		if (!authHeader) {
			return res.status(401).json({message: "UnAuthorized Header Missing"})
		}
		const token = authHeader.split(" ")[1]
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				return res.status(403).json({message: "You are not Logged In"})
			}
			req.email = decoded.email
			next()
		})
	}catch(e){
		console.log("here")
	}
}