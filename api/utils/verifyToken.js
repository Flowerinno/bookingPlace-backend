import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
	//get token from a request with username
	const token = req.cookies.access_token;
	//if no token throw error
	if (!token) {
		return next(createError(401, "You are not authenticated"));
	}
	//jsonwebtoken verifies the user token , jwt_secret is a must property for jwt 
	// if error => next() ; if token is valid => creating a new property req.user = user => calling next() to go to the next step;
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return next(createError(403, "Token is not valid"));
		} else {
			req.user = user;
			next();
		}
	});
};

export const verifyUser = (req, res, next) => {
	//firstly verifies user token; if user.id mathes req.params.id or req.user.isAdmin
	// calling next() to go to the next step else => throw error
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return next(createError(403, "You are not authorized"));
		}
	});
};
