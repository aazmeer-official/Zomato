// Create Server
const express = require("express")
const app = express()
const connectDB = require("./db/db.js")
const path = require("path");
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser")
const dns = require("dns");
const authRoutes = require("./routes/auth.routes.js")

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Middlewares
app.use(express.urlencoded({extended:true}))  //For Parsing
app.use(express.json())
app.use(methodOverride('_method'))
app.use(cookieParser())

connectDB()

app.get("/",(req,res)=>{ 
    res.send("Response")
})
app.use("/api/auth",authRoutes)
module.exports = app;