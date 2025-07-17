const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
	const mongoURI = process.env.MONGODB_URI;

	mongoose
		.connect(mongoURI, {
        useNewUrlParser: true,  
        useUnifiedTopology: true,
        })
		.then(() => console.log("Database connected successfully"))
		.catch((error) => {
			console.error("MongoDB connection error:", error.message);
			process.exit(1);
		});

	mongoose.connection.on("disconnected", () => {
		console.warn("MongoDB disconnected");
	});

	mongoose.connection.on("error", (err) => {
		console.error("MongoDB connection error:", err.message || err);
	});

	process.on("SIGINT", async () => {
		await mongoose.connection.close();
		console.log("Database connection closed due to application termination");
		process.exit(0);
	});
};

module.exports = connectDB;


//const mongoose = require('mongoose');
// require('dotenv').config();

// const dbconnection = ()=> {
//         mongoose.connect(
//         process.env.db_url, {
//         useNewUrlParser: true,  // Use the new URL parser
//         useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
//         }
//     ).then(() => {
//         console.log("Database connected successfully");

//     }
//     ).catch((err) => {
//         console.log("Database connection failed", err);
//     });
// }

// module.exports = dbconnection;