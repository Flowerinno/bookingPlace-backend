import mongoose from "mongoose";
const { Schema } = mongoose;

const RoomSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		price: {
			type: Number,
			required: true,
		},
		maxPeople: {
			type: Number,
			default: false,
		},
		description: {
			type: String,
			required: true,
		},
		roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
	},
	{ timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
