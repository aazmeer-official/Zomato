// Create Server

const express = require("express")
const app = express()
const connectDB = require("./db/db.js")
const path = require("path");
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dns = require("dns");
const authRoutes = require("./routes/auth.routes.js")
const foodRoutes = require("./routes/food.routes.js")

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Middlewares
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error("Not allowed by CORS"))
    },
    credentials: true
}))
app.use(express.urlencoded({extended:true}))  //For Parsing
app.use(express.json())
app.use(methodOverride('_method'))
app.use(cookieParser())

connectDB()

app.get("/",(req,res)=>{ 
    res.send("Response")
})


// Routes
app.use("/api/auth",authRoutes)
app.use("/api/food",foodRoutes)
module.exports = app;
