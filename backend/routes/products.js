const express = require('express')
const router = express.Router();
const multer = require("multer")
const {storage} = require("../cloudinary")
const upload = multer({storage})
const productsController = require('../controllers/products')

router.get("/getProducts",productsController.getAllProducts)
router.post("/addNewProduct", upload.array("image"),productsController.addNewProducts )

module.exports = router