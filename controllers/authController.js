const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

// Register a new user (Optional, if registration is allowed)
exports.register = async (req, res, next) => {
	try {
		const { firstName, lastName, email, password, role } = req.body;

		// Check if user already exists
		let user = await User.findOne({ email });
		if (user) return res.status(400).json({ message: "User already exists" });

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user
		user = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			role,
		});

		await user.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		next(error);
	}
};

// Login user
exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Find user
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "Invalid credentials" });

		// Compare password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });

		// Create JWT
		const payload = {
			user: {
				id: user.id,
				role: user.role,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		};

		const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "1h" });

		// Respond with token and user info
		res.json({
			token,
			user: {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		next(error);
	}
};
