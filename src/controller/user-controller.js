let express = require("express");
let router = express.Router();
let UserValidator = require("../utils/validator");
let CustomResponse = require("../utils/custom-response");
let CONSTANT = require("../utils/constant");
let UserService = require("../service/user-service");
router.post("/", UserValidator.postUser, (req, res) => {
	let reqBody = req.body;
	let result = UserService.register(reqBody);
	res
		.status(201)
		.send(
			CustomResponse.sucessResponse(
				201,
				CONSTANT.USER.REGISTER_SUCCESS,
				result,
			),
		);
});
router.put("/:id", (req, res) => {
	let userID = req.params.id;
	let reqBody = req.body;
	let result = UserService.update(userID, reqBody);
	res
		.status(200)
		.send(
			CustomResponse.sucessResponse(200, CONSTANT.USER.DATA_UPDATED, result),
		);
});
router.get("/:id", (req, res) => {
	let userID = req.params.id;
	let result = UserService.getById(userID);
	res
		.status(200)
		.send(
			CustomResponse.sucessResponse(200, CONSTANT.USER.USER_DATA_FOUND, result),
		);
});

router.get("/", (req, res) => {
	// let userID = req.params.id;
	let result = UserService.getAllList();
	res
		.status(200)
		.send(
			CustomResponse.sucessResponse(200, CONSTANT.USER.USER_DATA_FOUND, result),
		);
});

router.delete("/:id", (req, res) => {
	let userID = req.params.id;
	let result = UserService.delete(userID);
	res
		.status(200)
		.send(CustomResponse.sucessResponse(200, CONSTANT.USER.DATA_DELETED));
});

// 		.catch((error) => {});

module.exports = router;
