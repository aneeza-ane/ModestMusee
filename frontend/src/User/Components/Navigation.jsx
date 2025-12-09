import React from "react";
import styles from "../Styles/Navigation.module.css";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (token) navigate("/profile");
    else navigate("/login"); // or navigate to login
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (token) navigate("/checkout");
    else navigate("/"); // or navigate to login
  };

  return (
    <div>
      <div className={styles.topBanner}>
        FREE DELIVERY ON ALL ORDERS ABOVE RS.3999
      </div>

      <nav className={`navbar navbar-expand-lg ${styles.navbarCustom}`}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <button
            className={styles.hamburgerBtn}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
          >
            <i className="bi bi-list"></i>
          </button>

          <div className={styles.logoContainer}>
            <img
              src="/logofinal.jpg"
              alt="Modest Muse Logo"
              className={styles.logo}
            />
          </div>

          <div className={styles.iconGroup}>
            <a href="#" className={styles.icon}><i className="bi bi-search"></i></a>
            <a href="#" className={styles.icon} onClick={handleProfileClick}>
              <i className="bi bi-person-circle
"></i>
            </a>
            <a href="#" className={styles.icon} onClick={handleCartClick}>
              <i className="bi bi-bag"></i>
            </a>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasMenuLabel">Categories</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <a href="#" className={styles.menuLink}>Hijabs</a>
          <a href="#" className={styles.menuLink}>Abayas</a>
          <a href="#" className={styles.menuLink}>Niqabs</a>
          <a href="#" className={styles.menuLink}>Gloves</a>
          <a href="#" className={styles.menuLink}>Scrunchies</a>
          <a href="#" className={styles.menuLink}>Undercaps</a>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
