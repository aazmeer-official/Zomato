const foodPartnerModel = require("../models/foodpartner.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const authFoodPartnerMiddleware = async(req,res,next)=>{

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Please Login First "
        })
    }

    try{
        // Try to verify the token
        const decoded = jwt.verify(token,process.env.SECRET)
        const foodPartner = await foodPartnerModel.findById(decoded.id)
        // To check whether the food partner is deleted or not 


        if (!foodPartner) {
            return res.status(401).json({
                message: "Food Partner not found"
            })
        }


        req.foodPartner = foodPartner //Creating a new property of request
        next()

    }catch(e){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

}

const authUserMiddleware = async(req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        res.status(400).json({
            message:"Please Login First"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRET)
        const user = userModel.findById(decoded)

        if(!user){
            res.status(400).json({
                message:"User Not Found!"
            })
        }

        req.user = user;
        next()
    }catch(e){
        res.status(400).json({
            message:"Not Valid Request"
        })
    }
}


module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}