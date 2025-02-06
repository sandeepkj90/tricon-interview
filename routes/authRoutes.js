const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateLogin, validateRegister } = require("../utils/validator");

// Register route (Optional)
router.post("/register", validateRegister, authController.register);

// Login route
router.post("/login", validateLogin, authController.login);

module.exports = router;
