import React, { useEffect, useState } from "react";
import styles from "../Styles/Cart.module.css";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token
        const res = await axios.get("http://localhost:5000/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data.products);
      } catch (err) {
        console.error(err);
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/cart/update",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.products);
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:5000/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.products);
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (loading) return <p style={{ textAlign: "center" }}>Loading cart...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <>
      <Navigation />
      <div className={styles.cartContainer}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.map((item) => (
                <div key={item.product._id} className={styles.cartItem}>
                  <img src={`http://localhost:5000/uploads/${item.product.image}`} alt={item.product.name} />
                  <div className={styles.itemDetails}>
                    <p>{item.product.name}</p>
                    <p>Rs. {item.product.price}</p>
                    <div className={styles.quantityBox}>
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity > 1 ? item.quantity - 1 : 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.product._id)} className={styles.removeBtn}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <h3>Total: Rs. {totalPrice}</h3>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
