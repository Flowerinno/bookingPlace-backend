import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
	//get hotelId to add new room to it via req.params.hotelId in url
	// create new room via Room schema
	const hotelId = req.params.hotelId;
	const newRoom = new Room(req.body);

	try {
		//save new room to mongodb
		const savedRoom = await newRoom.save();
		try {
			// await to find the exact hotel and push to the rooms array savedRoom.id
			await Hotel.findByIdAndUpdate(hotelId, {
				$push: { rooms: savedRoom.id },
			});
			res.status(200).json(savedRoom);
		} catch (error) {
			next(error);
		}
	} catch (error) {
		next(error);
	}
};
export const updateRoom = async (req, res, next) => {
	// get the room by id and update via $set: req.body ;
	// { new: true } to return updated room instead of old version
	try {
		const updatedRoom = await Room.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedRoom);
	} catch (error) {
		next(error);
	}
};
export const deleteRoom = async (req, res, next) => {
	// get hotelId from url provided in url
	const hotelId = req.params.hotelId;
	// await find by req.params.id and delete room
	try {
		await Room.findByIdAndDelete(req.params.id);
		try {
			// await find by req.params.hotelId and delete(pull) exact room from Hotels.rooms array[]
			await Hotel.findByIdAndUpdate(hotelId, {
				$pull: { rooms: req.params.id },
			});
			res
				.status(200)
				.json(
					`The room with id ${req.params.id} was removed from hotel with id ${req.params.hotelId}`
				);
		} catch (error) {
			next(error);
		}
		res.status(200).json("Room has been deleted");
	} catch (error) {
		next(error);
	}
};
export const getRoom = async (req, res, next) => {
	try {
		const room = await Room.findById(req.params.id);
		res.status(200).json(room);
	} catch (error) {
		next(error);
	}
};
export const getAllRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (error) {
		next(error);
	}
};
