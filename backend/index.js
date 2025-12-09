import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import Stripe from "stripe";
import userRoutes from "./routes/userroutes.js";
import adminRoutes from "./routes/adminroutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import cartRoutes from "./routes/cartroutes.js"

import path from "path";

const __dirname = path.resolve(); 



const app = express();

// Middlewares 
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Connect DB
connectDB();


const stripe = new Stripe("sk_test_51SVq9YEmcrTulfudODNgWOg47SetUpBcymWu0NiHZ574YbS3Jf4rvgv0uneUiLV31rfc52TPBdUE8gsLGorzc7eI00R7ARePoK");

app.post("/create-checkout-session", async (req, res) => {
  const items  = req.body;


  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "pkr",
        product_data: { name: item.name },
        unit_amount: item.price, // already in paisas * 100
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/checkout",
    });

    res.send({ url: session.url }); // FIXED response
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

// Routes
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/", productRoutes);
app.use("/cart",cartRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/create-checkout-session", async (req, res) => {
  const items = req.body; // receive array
  console.log(items);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: items.map((item) => ({
        price_data: {
          currency: "usd", // PKR not supported
          product_data: {
            name: item.name,    // name now comes properly
          },
          unit_amount: item.price, // already *100 from frontend
        },
        quantity: item.quantity,
      })),

      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/checkout",
    });

    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});
