const express = require('express')
const authController = require('../controllers/auth.controller');

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


module.exports = authRouter
