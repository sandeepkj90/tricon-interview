const Joi = require("joi");

// Validate login data
exports.validateLogin = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });
	next();
};

// Validate registration data
exports.validateRegister = (req, res, next) => {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
		role: Joi.string().valid("ADMIN", "STUDENT", "FACULTY").required(),
	});

	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });
	next();
};
