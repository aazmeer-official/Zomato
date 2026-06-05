const express = require("express")
const router = express.Router();
const foodController = require("../controllers/food.controller")
const foodModel = require("../models/food.model")
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")

const upload = multer({ storage: storage })

// POST /api /food [protected]
router.post("/",authMiddleware.authFoodPartnerMiddleware,upload.single("video"),foodController.createFood)

module.exports = router;