const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const verifyJWT = require('../middleware').verifyJWT

router.post("/register", userController.signUp)
router.post("/login",userController.logIn)
router.get("/refresh",userController.autoRelogin)
router.get("/logout",verifyJWT,userController.logOut)

module.exports = router;