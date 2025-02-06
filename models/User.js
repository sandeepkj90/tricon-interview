const mongoose = require("mongoose");
const CONSTANT = require("../config/config");
const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phone: { type: Number, default: 123456789 },
	bloodGroup: { type: String, default: "" },
	dateOfBirth: { type: Date, default: "" },

	// Qualification as a sub-field
	qualifications: [
		{
			qualification: { type: String, default: "" },
			institution: { type: String, default: "" },
			passingYear: { type: Number, default: "" },
			grade: { type: String, default: "" },
		},
	],

	// Address as a sub-field
	address: {
		addressLine: { type: String, default: "" },
		district: { type: String, default: "" },
		state: { type: String, default: "" },
		pincode: { type: String, default: "" },
	},

	// Role: Admin, Student, or Faculty
	role: {
		type: String,
		enum: ["ADMIN", "STUDENT", "FACULTY"],
		default: "STUDENT",
	},
	OTP: {
		type: String,
		default: "",
	},

	// Additional fields based on role can be added dynamically
	createdAt: { type: Date, default: Date.now },
	isActive: {
		type: String,
		enum: ["INPROGRESS", "BLOCKED", "APPROVED"],
		default: "INPROGRESS",
	},
});

module.exports = mongoose.model(CONSTANT.COLLECTION.USER, userSchema);
