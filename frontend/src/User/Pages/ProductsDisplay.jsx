import React, { useEffect, useState } from "react";
import styles from "../Styles/Products.module.css";
import { getProducts } from "../../Service/api";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import { Link, useParams } from "react-router-dom";

function ProductsDisplay() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { category } = useParams(); // get category from URL

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProducts(); // fetch all products
        setProducts(res.data);

        // Filter by category if present
        if (category) {
          const filtered = res.data.filter(
            (product) => product.category === category
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <>
      <Navigation />

      {loading && <p style={{ textAlign: "center" }}>Loading products...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className={styles.productsSection}>
          <h2 className={styles.productsTitle}>
            {category ? category : "All Products"}
          </h2>
          <div className={styles.productsRow}>
            {filteredProducts.map((product) => (
              <Link 
                to={`/product/${product._id}`} 
                key={product._id} 
                className={styles.productCard}
              >
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.title}
                />
                <p className={styles.productName}>{product.title}</p>
                <p className={styles.productPrice}>Rs. {product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <br />
      <Footer />
    </>
  );
}

export default ProductsDisplay;