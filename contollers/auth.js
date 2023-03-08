import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
	// bcrypting password
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(req.body.password, salt);
	try {
		//creating new user via User schema
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash,
		});
		//saving new user to mongo
		await newUser.save();
		//status 200 - success , 201 successfully logged in/registered
		return res.status(201).send("User has been registered");
	} catch (err) {
		next(err);
	}
};
export const login = async (req, res, next) => {
	try {
		//find one user via User schema with unique username
		const user = await User.findOne({ username: req.body.username });
		//if user doesn't exist returns error
		if (!user) {
			return next(createError(404, "User not found"));
		}
		//comparing req.password with hashed password
		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);
		//if passwords don't match return error
		if (!isPasswordCorrect) {
			return next(createError(400, "Wrong password or username!"));
		}
		//jwts for attaching user access info via cookies : jsonwebtoken 
		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT_SECRET
		);
			//desctucturing all info without password and isAdmin properties for security purposes 
			// sending them back to client
		const { password, isAdmin, ...otherDetails } = user._doc;
		return res
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.status(201)
			.json({ details: { ...otherDetails }, isAdmin });
	} catch (err) {
		next(err);
	}
};
