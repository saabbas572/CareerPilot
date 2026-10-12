const mongoose = require("mongoose")


async function connectdb(){
    try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")
    }
    catch(e)
    {
        console.log(e)
    }
}


module.exports = connectdb