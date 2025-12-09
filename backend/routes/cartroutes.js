import express from "express";
import User from "../models/User.js";
import { protect } from "../utils/generatetoken.js";


const router = express.Router();

// GET cart for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.productId");
    res.json({ products: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get cart" });
  }
});

// ADD product to cart
// ADD product to cart
router.post("/add", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);

    // check if product already exists
    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex > -1) {
      user.cart[productIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    const updatedUser = await User.findById(req.user.id).populate("cart.productId");
    res.json({ cart: updatedUser.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
});


// UPDATE quantity of a product
router.put("/update", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);
    console.log(user.cart);
    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex > -1) {
      user.cart[productIndex].quantity = quantity;
      await user.save();
      const updatedUser = await User.findById(req.user.id).populate("cart.productId");
      res.json({ products: updatedUser.cart });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update cart" });
  }
});

// REMOVE product from cart
router.delete("/remove/:productId", protect, async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();

    const updatedUser = await User.findById(req.user.id).populate("cart.product");
    res.json({ products: updatedUser.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove from cart" });
  }
});

export default router;
