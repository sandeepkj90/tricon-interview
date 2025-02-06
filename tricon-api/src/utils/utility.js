let Utility = {
	getUniqueID: () => {
		let uniqueId = Math.floor(Math.random() * 1000);
		return uniqueId;
	},
};
Utility.getUniqueID();
module.exports = Utility;
