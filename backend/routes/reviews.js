const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviews')
const verifyJWT = require('../middleware').verifyJWT

router.post("/addReview", verifyJWT,reviewController.addNewReview)
router.post("/updateReview", verifyJWT,reviewController.updatedReview)
router.delete("/review/:id",verifyJWT,reviewController.deleteReview)

module.exports = router;