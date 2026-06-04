const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

registerUser = async (req,res)=>{
    const {fullName,email,password} = req.body;
    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    // Checking if the user Already exists 
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const user = await userModel.create({
        fullName,
        email,
        password:hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    },"ee1c0584848d443d037d378a786efe74")
    res.cookie("token",token)
    res.status(201).json({
        message:"USer Registered succesfully",
        user:{
            _id: user._id,
            email:user.email,
            fullName: user.fullName
        }
    })
    // await user.save()
}

module.exports = {
    registerUser
}