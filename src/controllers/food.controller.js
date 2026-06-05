const foodModel = require("../models/food.model");

const createFood = async(req,res)=>{
    console.log(req.body)
    console.log(req.foodPartner)
    res.send("Food Partner")

}
module.exports = {
    createFood
}