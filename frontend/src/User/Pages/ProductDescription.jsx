import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../Styles/ProductDescription.module.css";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import { getProductDetails, getProducts, addToCart } from "../../Service/api";

function ProductDescription() {
  const { id } = useParams(); // get _id from URL
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        // Fetch main product
        const res = await getProductDetails(id);
        const productData = res.data;
        setProduct(productData);

        // Fetch related products (excluding current product)
        const allProductsRes = await getProducts();
        const allProducts = allProductsRes.data;
        const related = allProducts
          .filter((p) => p._id !== id)
          .slice(0, 2); // get first 2 others
        setRelatedProducts(related);

      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [id]);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // --- Add to Cart function ---
  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);
      alert(`Added ${quantity} "${product.name}" to cart!`);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Failed to add product to cart");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  if (!product) return null;

  return (
    <>
      <Navigation />

      <div className={styles.container}>
        <div className={styles.mainProduct}>
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.title}
            className={styles.productImage}
          />
          <div className={styles.details}>
            <h2 className={styles.title}>{product.title}</h2>
            <p className={styles.price}>Rs. {product.price}</p>
            <p className={styles.desc}>{product.description}</p>

            <div className={styles.quantityBox}>
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>

            <button className={styles.cartBtn} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDescription;
