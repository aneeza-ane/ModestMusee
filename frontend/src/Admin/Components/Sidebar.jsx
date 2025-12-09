import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../Styles/Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <h2>MODEST MUSE</h2>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/manageItems"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          🧺 Manage Items

        </NavLink>
        <NavLink
          to="/admin/addItem"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          ➕ Add Items
        </NavLink>


        <NavLink
          to="/admin/viewItem"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          👁️ View Items
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
