require("dotenv").config()
const connectdb = require("./src/config/database")

const app = require('./src/app');


connectdb()

app.listen(3000,()=>{
    console.log("Server is ruuning on port 3000")
})