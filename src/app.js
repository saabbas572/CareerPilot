const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser())

/* Require all the routes*/
const authRouter = require("./routes/auth.route")

/* Use Routes */
app.use("/api/auth", authRouter)






module.exports = app;