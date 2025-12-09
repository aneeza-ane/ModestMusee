import express from "express";
import { contactUser, loginUser, signupUser } from "../controllers/usercontroller.js";
import { getProfile, updateProfile } from "../controllers/usercontroller.js";
import { protect } from "../utils/generatetoken.js";



const router = express.Router();
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/contactus", contactUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
