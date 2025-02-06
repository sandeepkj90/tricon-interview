const express = require("express");
const connectDB = require("./config/db");
const config = require("./config/config");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const classRoutes = require("./routes/classRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/attendance", attendanceRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start server
const PORT = config.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
