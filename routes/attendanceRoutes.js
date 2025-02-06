const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const authMiddleware = require("../middlewares/authMiddleware");

// All routes are protected
router.use(authMiddleware.protect);

// Mark attendance (Teacher only)
router.post(
	"/",
	authMiddleware.authorize("teacher"),
	attendanceController.markAttendance,
);

// Get attendance by class (Admin and Teachers)
router.get(
	"/class/:classId",
	authMiddleware.authorize("admin", "teacher"),
	attendanceController.getAttendanceByClass,
);

// Get attendance by student (Admin, Teachers, and the student themselves)
router.get(
	"/student/:studentId",
	authMiddleware.authorize("admin", "teacher", "student"),
	attendanceController.getAttendanceByStudent,
);

module.exports = router;
