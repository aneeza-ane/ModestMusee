import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import styles from "../Styles/Checkout.module.css";
import {
  getCart,
  updateCart,
  removeFromCart,
  createCheckoutSession,
} from "../../Service/api";

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY");

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data.products);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  // Handle quantity change
  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const res = await updateCart(productId, quantity);
      setCartItems(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  // Remove item
  const handleRemove = async (productId) => {
    try {
      const res = await removeFromCart(productId);
      setCartItems(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  // Proceed to Stripe checkout
  const handleCheckout = async () => {
    try {
      const items = cartItems.map((item) => ({
        name: item.productId.title,
        price: item.productId.price * 100,
        quantity: item.quantity,
      }));

      const res = await createCheckoutSession(items);
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className={styles.loading}>Loading cart...</p>;
  if (cartItems.length === 0)
    return <p className={styles.empty}>Your cart is empty.</p>;

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutWrapper}>
        {/* Header */}
        <div className={styles.checkoutHeader}>
          <h2>Checkout</h2>
        </div>

        {/* Cart Items */}
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.productId._id} className={styles.cartItem}>
              <img
                src={`http://localhost:5000/uploads/${item.productId.image}`}
                alt={item.productId.title}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <h4>{item.productId.title}</h4>
                <p className={styles.itemPrice}>PKR {item.productId.price}</p>
                <div className={styles.quantityBox}>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.productId._id,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.productId._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.productId._id)}
                >
                  Remove
                </button>
              </div>
              <div className={styles.itemTotal}>
                PKR {item.productId.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className={styles.summary}>
          <h3>Order Summary</h3>
          <p>
            Subtotal: <span>PKR {subtotal}</span>
          </p>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;