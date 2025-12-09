import mongoose from "mongoose";

// Schema for items in cart
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // reference to your Product model
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
    default: "",
  },

  cart: [cartItemSchema], // <-- new cart field

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
