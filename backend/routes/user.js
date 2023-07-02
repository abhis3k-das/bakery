const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const verifyJWT = require('../middleware').verifyJWT

router.post("/register", userController.signUp)
router.post("/login",userController.logIn)
router.get("/getCart/:id",verifyJWT,userController.getCart)
router.get("/getUserAddress/:id",userController.getUserAddress)
router.get("/refresh",userController.autoRelogin)
router.get("/logout",verifyJWT,userController.logOut)
router.put("/updateCart",verifyJWT,userController.updateCart)

module.exports = router;