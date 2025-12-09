import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generatetoken.js";
import Product from "../models/Product.js";
import path from "path";
import fs from "fs";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const passMatch = await bcrypt.compare(password, admin.password);
    if (!passMatch)
      return res.status(400).json({ message: "Wrong password" });

    const token = generateToken(admin._id, "admin");

    res.json({
      message: "Admin Login Successful",
      token
    });

  } catch (err) {
    res.status(500).json({ message: "Admin login failed", error: err.message });
  }
};


export const addItem = async (req, res) => {
  try {
    // Extract text fields
    const { title, category, description, quantity, price } = req.body;

    // Image that multer saved
    const imagePath = req.file ? req.file.filename : null;

    // Create product
    const newProduct = await Product.create({
      title,
      category,
      description,
      quantity,
      price,
      image: imagePath
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct
    });

  } catch (err) {
    console.log("Add Item Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to add item",
      error: err.message
    });
  }
};


export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete image from local uploads folder
    if (product.image) {
      const imagePath = path.join(process.cwd(), "uploads", product.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.log("Error deleting image:", err);
      });
    }

    // Delete product from DB
    await Product.findByIdAndDelete(id);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};


// ----------- VIEW ITEMS -----------
export const viewItems = async (req, res) => {
  try {
    const items = await Product.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

// ----------- UPDATE ITEM -----------
export const updateItem = async (req, res) => {
  try {
    console.log(req.body)
    const { title, category, description, quantity, price } = req.body;

    await Product.findByIdAndUpdate(req.params.id, {
      title,
      category,
      description,
      quantity,
      price
    });

    res.json({ message: "Product updated" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};
