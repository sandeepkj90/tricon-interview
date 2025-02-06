const Attendance = require("../models/Attendance");
const Class = require("../models/Class");
const User = require("../models/User");

// Mark attendance (Teacher only)
exports.markAttendance = async (req, res, next) => {
	try {
		const { classId, date, attendanceRecords } = req.body;

		// Verify class exists and teacher is assigned to it
		const foundClass = await Class.findById(classId);
		if (!foundClass)
			return res.status(404).json({ message: "Class not found" });

		if (foundClass.teacherId.toString() !== req.user.id) {
			return res
				.status(403)
				.json({ message: "Unauthorized to mark attendance for this class" });
		}

		// Ensure attendance for the date is not already marked
		const existingAttendance = await Attendance.findOne({ classId, date });
		if (existingAttendance) {
			return res
				.status(400)
				.json({ message: "Attendance for this date is already marked" });
		}

		// Validate attendanceRecords
		const validStudentIds = foundClass.students.map((id) => id.toString());
		for (const record of attendanceRecords) {
			if (!validStudentIds.includes(record.studentId)) {
				return res
					.status(400)
					.json({
						message: `Student ID ${record.studentId} is not in this class`,
					});
			}
			if (!["present", "absent"].includes(record.status)) {
				return res
					.status(400)
					.json({
						message: `Invalid status for student ID ${record.studentId}`,
					});
			}
		}

		// Create attendance record
		const attendance = new Attendance({
			classId,
			date,
			attendanceRecords,
		});

		await attendance.save();

		res.status(201).json(attendance);
	} catch (error) {
		next(error);
	}
};

// Get attendance for a class (Admin and Teacher)
exports.getAttendanceByClass = async (req, res, next) => {
	try {
		const classId = req.params.classId;

		// If teacher, ensure they are assigned to the class
		if (req.user.role === "teacher") {
			const foundClass = await Class.findById(classId);
			if (!foundClass || foundClass.teacherId.toString() !== req.user.id) {
				return res
					.status(403)
					.json({ message: "Unauthorized to view attendance for this class" });
			}
		}

		const attendanceRecords = await Attendance.find({ classId }).populate(
			"attendanceRecords.studentId",
			"name email",
		);
		res.json(attendanceRecords);
	} catch (error) {
		next(error);
	}
};

// Get attendance for a student
exports.getAttendanceByStudent = async (req, res, next) => {
	try {
		const studentId = req.params.studentId;

		// If student, ensure they are requesting their own attendance
		if (req.user.role === "student" && req.user.id !== studentId) {
			return res
				.status(403)
				.json({ message: "Unauthorized to view this attendance" });
		}

		const attendanceRecords = await Attendance.find({
			"attendanceRecords.studentId": studentId,
		})
			.populate("classId", "className")
			.populate("attendanceRecords.studentId", "name email");

		// Filter records to include only the specific student's attendance
		const filteredRecords = attendanceRecords.map((record) => {
			const studentRecord = record.attendanceRecords.find(
				(r) => r.studentId._id.toString() === studentId,
			);
			return {
				_id: record._id,
				classId: record.classId,
				date: record.date,
				status: studentRecord ? studentRecord.status : "absent",
			};
		});

		res.json(filteredRecords);
	} catch (error) {
		next(error);
	}
};
