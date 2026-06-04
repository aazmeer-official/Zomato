const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const foodPartnerModel = require("../models/foodpartner.model")
const secret = process.env.SECRET
const registerUser = async (req,res)=>{
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
const loginUser = async (req,res)=>{
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
const logoutUser = (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        message:"User Logout Successfully"
    })
}

// Food Partner

const registerFoodPartner = async (req,res)=>{
    const {fullName,email,password} = req.body;
    const isAccountAlreadyExists = await foodPartnerModel.findOne({email})
    if(isAccountAlreadyExists){
        return res.status(400).json({
            message:"Food Partner Account Already Exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const foodPartner = await foodPartnerModel.create({
        fullName,
        email,
        password:hashedPassword
    })
    const token = jwt.sign({
        id:foodPartner._id,
    },secret)

    res.cookie("token",token)
    res.status(201).json({
        message: "Food Partner Registered Successfully",
        foodPartner:{
            _id: foodPartner._id,
            email:foodPartner.email,
            fullName:foodPartner.fullName
        }
    })

}
const loginFoodPartner = async (req,res)=>{
    const {email, password} = req.body
    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if(!foodPartner){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,foodPartner.password)
    
    if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid Email or Password"
            })       
        }

    const token = jwt.sign({
        id:foodPartner._id,
    },secret)

    res.cookie("token",token)
    res.status(201).json({
        message:"FoodPartner Logged in succesfully",
        foodPartner:{
            _id: foodPartner._id,
            email:foodPartner.email,
            fullName: foodPartner.fullName
        }
    })

}
const logoutFoodPartner = (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        message:"Food Partner Logout Successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}