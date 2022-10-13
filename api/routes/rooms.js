import express from "express";
import {
	createRoom,
	updateRoom,
	deleteRoom,
	getRoom,
	getAllRooms,
} from "../contollers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/:hotelId", verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

//GET
router.get("/:id/:hotelId", getRoom);

//GET ALL
router.get("/", getAllRooms);

export default router;
