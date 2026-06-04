const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET
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
    },secret)
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
loginUser = async (req,res)=>{
    const{email,password} = req.body
    const user = await userModel.findOne({
        email
    })
    if(!email){
        return res.status(400).json({
            message:"Invalid Email or Password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid Email or Password"
            })       
        }

        const token = jwt.sign({
        id:user._id,
    },secret)

    res.cookie("token",token)
    res.status(201).json({
        message:"USer Logged in succesfully",
        user:{
            _id: user._id,
            email:user.email,
            fullName: user.fullName
        }
    })

    }

    

module.exports = {
    registerUser,
    loginUser
}