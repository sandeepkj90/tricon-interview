const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Get user profile
router.get("/profile", authMiddleware.protect, userController.getProfile);

// Update user profile (Optional)
router.put("/profile", authMiddleware.protect, userController.updateProfile);

module.exports = router;
