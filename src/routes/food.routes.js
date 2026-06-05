const express = require("express")
const router = express.Router();
const foodController = require("../controllers/food.controller")
const foodModel = require("../models/food.model")
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")

// POST /api /food [protected]
router.post("/",authMiddleware.authFoodPartnerMiddleware,foodController.createFood)

module.exports = router;