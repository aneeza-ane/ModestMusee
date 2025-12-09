import express from "express";
import { getProducts, getProductById } from "../controllers/productcontroller.js";

const router = express.Router();

router.get("/getProducts", getProducts);
router.get("/user/product/:id", getProductById);

export default router;