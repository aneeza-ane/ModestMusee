import Product from "../models/Product.js"; // your product model

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // fetch all products
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
// Get product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product); // send product data as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product", error: err.message });
  }
};

