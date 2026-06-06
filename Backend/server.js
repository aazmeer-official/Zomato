// .env File
if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
// Start Server
const app = require("./src/app.js")

app.listen("3000",()=>{
    console.log("Server running at 3000")
})