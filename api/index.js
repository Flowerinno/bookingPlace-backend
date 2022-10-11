import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();
//dotenv module required to use .env file
dotenv.config();

const PORT = 3000;
//connection to mongoDB via mongoose
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log("connected to mongo");
	} catch (error) {
		throw error;
	}
};

// middlewares
//allows sending and reading cookies
app.use(cookieParser());
//allows sending and reading json format
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
//error handling
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const messageError = err.message || "Something went wrong";
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: messageError,
		stack: err.stack,
	});
});

app.listen(PORT, () => {
	connect();
	console.log(`Your server is listening at ${PORT}`);
});
