const express = require('express')
const router = express.Router();
const orderController = require('../controllers/orders');
const { verifyJWT } = require('../middleware');
router.post('/placeOrder/:id',orderController.placeOrder)
router.get('/getOrders/:id',verifyJWT,orderController.getOrders)
module.exports = router;