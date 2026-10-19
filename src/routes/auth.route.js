const express = require('express');
const authController = require('../controllers/auth.controller');
const authmiddleware = require("../middleware/auth.middleware");

const authRouter = express.Router()

/**
 * @route /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUser);

/**
 * @route /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login",authController.LoginUser)


/**
 * @route /api/auth/logout
 * @desc Logout a user
 * @access Public
 */
authRouter.get("/logout", authController.LogoutUserController);


/**
 * @route /api/auth/me
 * @desc Get the currently logged-in user's information
 * @access Private
 */
authRouter.get("/getme", authmiddleware.authuser, authController.getme);

module.exports = authRouter
