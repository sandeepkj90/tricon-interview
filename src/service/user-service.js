let userList = [];
let Utility = require("../utils/utility");
let CONSTANT = require("../utils/constant");
let UserService = {
	register: (userData) => {
		let uniqueID = `USR${Utility.getUniqueID()}`;
		userData.id = uniqueID;
		userList.push(userData);
		return userData;
	},

	update: (userId, userData) => {
		const dataIndex = userList.findIndex((user) => user.id == userId);
		if (dataIndex != -1) {
			userList.splice(dataIndex, 1, { ...userList[dataIndex], ...userData });
		}
		return userList[dataIndex];
	},
	getById: (userId) => {
		let result = userList.find((item) => item.id == userId);

		return result;
	},

	// findInde with id  = indexreq.accepts(splice(index,1,userData));
	getAllList: () => {
		let result = userList;

		return result;
	},
	delete: (userId) => {
		let afterDeleteList = userList.filter((item) => item.id != userId);
		userList = afterDeleteList;
		return CONSTANT.USER.DATA_DELETED;
	},
};

module.exports = UserService;
