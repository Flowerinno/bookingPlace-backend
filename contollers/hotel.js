import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
export const createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body);

	try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (error) {
		next(error);
	}
};
export const updateHotel = async (req, res, next) => {
	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedHotel);
	} catch (error) {
		next(error);
	}
};
export const deleteHotel = async (req, res, next) => {
	try {
		const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
		res.status(200).json("Hotel has been deleted");
	} catch (error) {
		next(error);
	}
};
export const getHotel = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.status(200).json(hotel);
	} catch (error) {
		next(error);
	}
};

export const getAllHotels = async (req, res, next) => {
	const { min, max, ...others } = req.query;
	try {
		const hotels = await Hotel.find({
			...others,
			cheapestPrice: { $gt: min | 1, $lt: max | 999 },
		}).limit(req.query.limit);
		res.status(200).json(hotels);
	} catch (error) {
		next(error);
	}
};

export const countByCity = async (req, res, next) => {
	// get query params from url ?cities=london,madrid etc...
	const cities = req.query.cities
		.split(",")
		.map((city) => city.charAt(0).toUpperCase() + city.slice(1));

	try {
		// get list of cities by mongoose .countDocuments with cities names where these hotels are located
		const list = await Promise.all(
			cities.map((city) => {
				return Hotel.countDocuments({ city: city });
			})
		);
		//return success if OK
		res.status(200).json(list);
	} catch (error) {
		next(error);
	}
};

export const countByType = async (req, res, next) => {
	try {
		const hotelCount = await Hotel.countDocuments({ type: "hotel" });
		const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
		const resortCount = await Hotel.countDocuments({ type: "resort" });
		const villaCount = await Hotel.countDocuments({ type: "villa" });
		const cabinCount = await Hotel.countDocuments({ type: "cabin" });

		res.status(200).json([
			{ type: "hotel", count: hotelCount },
			{ type: "apartment", count: apartmentCount },
			{ type: "resort", count: resortCount },
			{ type: "villa", count: villaCount },
			{ type: "cabin", count: cabinCount },
		]);
	} catch (error) {
		next(error);
	}
};

export const getHotelRooms = async (req, res, next) => {
	try {
		//find hotel by id
		const hotel = await Hotel.findById(req.params.id);
		//get list of rooms from the hotel
		const list = await Promise.all(
			hotel.rooms.map((room) => {
				return Room.findById(room);
			})
		);
		return res.status(200).json(list);
	} catch (error) {
		next(error);
	}
};
