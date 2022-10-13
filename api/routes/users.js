import express from "express";
import {
	createUser,
	updateUser,
	deleteUser,
	getUser,
	getAllUsers,
} from "../contollers/user.js";

import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//cheks whether the user has auth token or not
// router.get("/checkauthentication", verifyToken, (req, res) => {
// 	res.send("Hello user , you are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res) => {
// 	res.send("Hello user ,you can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
// 	res.send("You are logged in and you are an admin!");
// });


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


export default router;
