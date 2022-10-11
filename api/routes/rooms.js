import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

//CREATE
router.post("/", async (req, res) => {
	const newRoom = new Room(req.body);

	try {
		const savedRoom = await newRoom.save();
		res.status(200).json(savedRoom);
	} catch (error) {
		res.status(500).json(error);
	}
});

//UPDATE

//DELETE

//GET

//GET ALL
export default router;
