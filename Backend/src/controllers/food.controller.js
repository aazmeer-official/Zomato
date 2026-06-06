const storageService = require("../services/storage.services")
const { v4: uuidv4 } = require("uuid")
const foodModel = require("../models/food.model")

// Controllers
const createFood = async(req,res)=>{

    const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuidv4())


    const foodItem = await foodModel.create({
        name:req.body.name,
        video:fileUploadResult.url,
        description:req.body.description,
        foodPartner:req.foodPartner._id
    })


    res.status(201).json({
        message:"Food Item created Successfully!",
        food:foodItem
    })

}

const getFood = async(req,res)=>{
    const foodItems = await foodModel.find({})

    res.status(200).json({
        message:"Food Items Fetched Succesfully",
        foodItems
    })
}

// Exports
module.exports = {
    createFood,
    getFood
}