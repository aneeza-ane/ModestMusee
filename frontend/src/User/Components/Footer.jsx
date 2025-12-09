import React from "react";
import styles from "../Styles/footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row gy-4">
          {/* Contact Info */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold mb-3">Get in touch</h5>
            <p>
              <i className="bi bi-geo-alt-fill me-2"></i>
              Khalid bin Waleed Road <br /> Karachi, Pakistan
            </p>
            <p>
              <i className="bi bi-envelope-fill me-2"></i>
              stylefits420@gmail.com
            </p>
            <p>
              <i className="bi bi-telephone-fill me-2"></i>
              +92 336 0817961
            </p>
            <div className="mt-3">
              <a href="#" className={styles.social} aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className={styles.social} aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className={styles.social} aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className={styles.social} aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className={styles.social} aria-label="Pinterest">
                <i className="bi bi-pinterest"></i>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="col-6 col-md-3 col-lg-3">
            <h5 className="fw-bold mb-3">Collection</h5>
            <ul className="list-unstyled">
              <li>Abayas</li>
              <li>Niqabs</li>
              <li>Hijabs</li>
              <li>Undercaps</li>
              <li>Gloves</li>
              <li>Scrunchies</li>
            </ul>
          </div>

          {/* Information */}
          <div className="col-6 col-md-3 col-lg-3">
            <h5 className="fw-bold mb-3">Information</h5>
            <ul className="list-unstyled">
              <li>Search</li>
              <li>Shipping Policy</li>
              <li>Exchange Policy</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold mb-3">Newsletter Signup</h5>
            <p>Subscribe to our newsletter and get 10% off your first purchase</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
