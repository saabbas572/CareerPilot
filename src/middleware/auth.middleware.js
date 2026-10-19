const jwt = require("jsonwebtoken")
const tokenblacklistModel = require("../models/blacklist.model")

async function authuser(req, res, next){

    const token = req.cookies.token

    const istokenblacklist = await tokenblacklistModel.findOne({token})

    

    if(!token)
    {
        return res.status(401).json({
            message: "token not provided"
        })
    }

    if(istokenblacklist){
        return res.status(401).json({
            message: "Token is blacklisted"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        next()
    }
    catch (err)
    {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

}



module.exports = {authuser}