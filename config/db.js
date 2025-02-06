const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
	try {
		await mongoose.connect(config.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useCreateIndex: true, // Deprecated in newer mongoose versions
			// useFindAndModify: false // Deprecated
		});
		console.log("MongoDB connected");
	} catch (error) {
		console.error("MongoDB connection failed:", error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
