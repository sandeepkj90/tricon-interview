let CONSTANT = require("./constant");
let CustomResponse = require("./custom-response");
const Validator = {
	postUser: (req, res, next) => {
		let userData = req.body;
		if (!userData.name && !userData.email && !userData.company)
			return res
				.status(401)
				.send(CustomResponse.errorResponse(401, CONSTANT.USER.VALIDATE_ERROR));
		else next();
	},
};

module.exports = Validator;
