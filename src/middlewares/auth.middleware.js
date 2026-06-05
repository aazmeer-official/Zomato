const foodPartnerModel = require("../models/foodpartner.model")
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
        console.log(foodPartner)
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


module.exports = {
    authFoodPartnerMiddleware
}