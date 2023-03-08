import express from "express";
import {
	createUser,
	updateUser,
	deleteUser,
	getUser,
	getAllUsers,
} from "../contollers/user.js";

import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", createUser);

// UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getAllUsers);

router.get("/test", (req, res) => {
	res.json("some data here");
});

export default router;
