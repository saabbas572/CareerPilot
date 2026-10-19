const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenblacklistmodel = require('../models/blacklist.model')




/**
 * @name registerUserController
 * @desc Register a new user
 * @access Public
 */


async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const isUserExists = await userModel.findOne({ $or: [{ email }, { username }] });
        if (isUserExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ username, email, password: hashedPassword });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie("token",token)
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', 
            
            user: {id: newUser._id,
                username: newUser.username,
                email: newUser.email
            } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


/**
 * @name LoginUserController
 * @desc Login a user
 * @access Public
 */

async function LoginUser(req, res){
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const ispasswordvalid = await bcrypt.compare(password, user.password)

        if(!ispasswordvalid)
        {
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        

        res.cookie("token",token)

        res.status(200).json({
            message: "User Loggedin Success",user: {id: user._id,
                username: user.username,
                email: user.email
            }
        })


    }
    catch(err)
    {
        console.log(err)
    }
}


/**
 * @name LogoutUserController
 * @desc Logout a user
 * @access Public
 */

async function LogoutUserController(req, res)
{
    const token = req.cookies.token

    if(token)
    {
        await tokenblacklistmodel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "Logout Success"
    })
}


/**
 * @name getme
 * @desc Get the currently logged-in user's information
 * @access Private
 */

async function getme(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User Successfully Fetched",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


module.exports = {
    registerUser, LoginUser, LogoutUserController,getme
}