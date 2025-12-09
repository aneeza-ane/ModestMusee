import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../Components/Sidebar";
import styles from "../Styles/ViewItems.module.css";
import { useNavigate } from "react-router-dom";
import { adminDeleteItems, adminViewItems } from "../../Service/api";
import { ProductContext } from "../Context/ProductContext";

const API = "http://localhost:5000";

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();
  const { setSelectedProduct } = useContext(ProductContext);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await adminViewItems();
      setItems(res.data);
    } catch (err) {
      alert("Failed to fetch items");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await adminDeleteItems(id);
      setItems(items.filter((item) => item._id !== id));
      alert("Item deleted");
    } catch (err) {
      alert("Delete failed");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <div className={styles.header}>
          <h1>View Items</h1>

          <div className={styles.filters}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.dropdown}
            >
              <option value="All">All Categories</option>
              <option value="Abayas">Abayas</option>
              <option value="Hijabs">Hijabs</option>
              <option value="Niqabs">Niqabs</option>
              <option value="Undercaps">Undercaps</option>
              <option value="Gloves">Gloves</option>
              <option value="Scrunchies">Scrunchies</option>
            </select>

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.search}
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={`${API}/uploads/${item.image}`}
                      alt={item.title}
                      className={styles.image}
                    />
                  </td>

                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>

                  <td>
                    <span
                      className={`${styles.status} ${
                        item.quantity > 5
                          ? styles.inStock
                          : item.quantity > 0
                          ? styles.lowStock
                          : styles.outOfStock
                      }`}
                    >
                      {item.quantity > 5
                        ? "In Stock"
                        : item.quantity > 0
                        ? "Low Stock"
                        : "Out of Stock"}
                    </span>
                  </td>

                  <td className={styles.actions}>
                    <button
                      className={styles.edit}
                      onClick={() => {
                        setSelectedProduct(item);
                        navigate("/admin/updateItem/:id");
                      }}
                    >
                      ✏ Edit
                    </button>

                    <button
                      className={styles.delete}
                      onClick={() => handleDelete(item._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="7" className={styles.noResults}>
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ViewItems;
