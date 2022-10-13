import User from "../models/User.js";

export const createUser = async (req, res, next) => {
	//create new user via User schema with req.body parameters
	const newUser = new User(req.body);

	try {
		//save new user to mongo
		const savedUser = await newUser.save();
		res.status(200).json(savedUser);
	} catch (error) {
		next(error);
	}
};
export const updateUser = async (req, res, next) => {
	try {
		//find user by (req.params.id) and update ($set: req.body) , {new: true} to return new version of user info
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
};
export const deleteUser = async (req, res, next) => {
	try {
		//find user by (req.params.id) and remove from database
		const deleteUser = await User.findByIdAndDelete(req.params.id);
		//return success message if user has been deleted
		res.status(200).json("User has been deleted");
	} catch (error) {
		next(error);
	}
};
export const getUser = async (req, res, next) => {
	try {
		//get user by (req.params.id)
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
export const getAllUsers = async (req, res, next) => {
	try {
		// get all users with find() method in users collection
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};
