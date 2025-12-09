import express from "express";
import { adminLogin, addItem, viewItems, updateItem, deleteItem } from "../controllers/adminController.js";
import { protectAdmin } from "../utils/generatetoken.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/item",protectAdmin,upload.single("image"), addItem);
router.get("/items",protectAdmin, viewItems);
router.put("/item/:id",protectAdmin, upload.single("image"),updateItem);
router.delete("/item/:id", protectAdmin,deleteItem);

export default router;
