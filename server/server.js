const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const loginRouter = require("./routes/loginRouter");
const authRouter = require("./routes/auth");
const helmet = require("helmet");

require("dotenv").config();
require("./config/connection")();


const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Root route
app.get("/", (req, res) => {
	res.send("Welcome to the Code Conqurors 😊");
});

// Global Error Handler	
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: true, data: null, message: "Internal Server Error" });
});

// other routes
app.use("/api", loginRouter);
app.use("/api/auth",authRouter);

// Server
const PORT = process.env.PORT || 9705;
app.listen(PORT, () => {
	console.log(`🚀 Server is running at http://localhost:${PORT}`);
});


// Auto-load routes
// const routesPath = path.join(__dirname, "routes");
// fs.readdirSync(routesPath).forEach((file) => {
// 	if (file.endsWith(".router.js")) {
// 		const route = require(path.join(routesPath, file));
// 		const routePath = "/" + file.replace(".router.js", "");
// 		app.use(routePath, route);
// 	}
// });