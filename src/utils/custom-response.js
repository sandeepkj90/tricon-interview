let CustomResponse = {
	sucessResponse: (statusCode, message = "", data = []) => {
		return {
			status: statusCode,
			message,
			data,
		};
	},
	errorResponse: (statusCode, message = "") => {
		return {
			status: statusCode,
			message,
		};
	},
};
module.exports = CustomResponse;
