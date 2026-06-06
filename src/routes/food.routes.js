const express = require("express")
const router = express.Router();
const foodController = require("../controllers/food.controller")
const foodModel = require("../models/food.model")
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage()
})

// POST /api /food [protected]
router.post("/",authMiddleware.authFoodPartnerMiddleware,upload.single("video"),foodController.createFood)

// GET /api/food

// Jitnay bhi food items heen un ki video lgeen gi

router.get("/",authMiddleware.authUserMiddleware,foodController.getFood)



module.exports = router;