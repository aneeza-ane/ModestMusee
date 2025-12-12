import axios from "axios";

// const API = "http://localhost:5000";
 const API = "https://modest-muse-backend.vercel.app";

// User APIs
export const userSignup = (data) => {
  console.log("axios received");
  return axios.post(`${API}/user/signup`, data);
};

export const userLogin = (data) => {
  return axios.post(`${API}/user/login`, data);
};

export const userContact = (data) => {
  return axios.post(`${API}/user/contactus`, data);
};

// Product APIs
export const getProductDetails = (id) => {
  return axios.get(`${API}/user/product/${id}`);
};

export const getProducts = async () => {
  return await axios.get(`${API}/getProducts`);
};

// Admin APIs
export const adminLogin = (data) => {
  return axios.post(`${API}/admin/login`, data);
};

export const adminAddItem = (data) => {
  return axios.post(`${API}/admin/item`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const adminViewItems = () => {
  return axios.get(`${API}/admin/items`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const adminDeleteItems = (id) => {
  return axios.delete(`${API}/admin/item/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const adminUpdateItem = async (id, data) => {
  return await axios.put(`${API}/admin/item/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// Checkout API
export const createCheckoutSession = (data) => {
  return axios.post(`${API}/create-checkout-session`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// --- Cart APIs ---
// Get cart
export const getCart = () => {
  return axios.get(`${API}/cart`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// Add to cart
export const addToCart = (productId, quantity = 1) => {
  return axios.post(
    `${API}/cart/add`,
    { productId, quantity },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
};

// Update cart
export const updateCart = (productId, quantity) => {
  return axios.put(
    `${API}/cart/update`,
    { productId, quantity },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
};

// Remove from cart
export const removeFromCart = (productId) => {
  return axios.delete(`${API}/cart/remove/${productId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
