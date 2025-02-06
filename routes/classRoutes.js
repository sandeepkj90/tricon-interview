const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");
const authMiddleware = require("../middlewares/authMiddleware");

// All routes are protected
router.use(authMiddleware.protect);

// Create a new class (Admin only)
router.post(
	"/",
	authMiddleware.authorize("admin"),
	classController.createClass,
);

// Get all classes (Admin and Teachers)
router.get(
	"/",
	authMiddleware.authorize("admin", "teacher"),
	classController.getAllClasses,
);

// Get a single class by ID (Admin and Teachers)
router.get(
	"/:id",
	authMiddleware.authorize("admin", "teacher"),
	classController.getClassById,
);

// Update a class (Admin only)
router.put(
	"/:id",
	authMiddleware.authorize("admin"),
	classController.updateClass,
);

// Delete a class (Admin only)
router.delete(
	"/:id",
	authMiddleware.authorize("admin"),
	classController.deleteClass,
);

module.exports = router;
