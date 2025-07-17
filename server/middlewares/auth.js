const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
	// Get the token from the Authorization header
	const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

	if (!token) {
		return res.status(401).json({
			error: true,
			data: null,
			message: "No token provided"
		});
	}

	// Verify the token using the secret key from .env
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				error: true,
				data: null,
				message: "Invalid or expired token"
			});
		}

		// Attach the decoded user information to the request object
		req.user = decoded;

		// Proceed to the next middleware or route handler
		next();
	});
};
