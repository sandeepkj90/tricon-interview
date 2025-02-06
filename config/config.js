require("dotenv").config();

module.exports = {
	PORT: process.env.PORT || 5000,
	COLLECTION: { USER: "users", COURSE: "courses" },
	MONGO_URI:
		process.env.MONGO_URI ||
		"mongodb+srv://sandeepkj90:avtsl%40sandy@cluster0.0votf7u.mongodb.net/flow-proximity-db?retryWrites=true&w=majority&appName=Cluster0",
	JWT_SECRET: process.env.JWT_SECRET || "techNE@sandeep123",
};
