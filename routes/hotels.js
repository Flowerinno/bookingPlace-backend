import express from "express";
import {
	countByCity,
	createHotel,
	deleteHotel,
	getAllHotels,
	getHotel,
	updateHotel,
	countByType,
	getHotelRooms,
} from "../contollers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
//CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getAllHotels);

//get list of cities
router.get("/countByCity", countByCity);

//get list of types (apartment,cabin,villa, hotel etc...)

router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms);
export default router;
