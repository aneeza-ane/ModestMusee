import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generatetoken.js";
import mongoose from "mongoose";



// ------------ LOGIN WITH JWT ------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Incorrect password" });

    // Create token
    const token = generateToken(user._id, "user");

    res.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


// -------------------- SIGNUP --------------------
export const signupUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name,  phone, address, email, password } = req.body;

    // Check if user exists
    const existing = await User.findOne({ email });
    if(existing) 
    {
      return res.status(400).json({ message: "Email already registered" });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      phone,
      address,
      email,
       password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};


// -------------------- CONTACT --------------------
export const contactUser = (req, res) => {
  console.log("Contact Us Hit");
  res.json({ message: "Contact message received" });
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId).select("name email phone address");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { name, email, phone, address } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, address },
      { new: true, runValidators: true }
    ).select("name email phone address");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error"});
  }
};