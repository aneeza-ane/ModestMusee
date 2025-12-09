import React from "react";
import styles from "../Styles/HeroSection.module.css";

function HeroSection() {
  return (
    <div className={styles.heroContainer}>
      <img
        src="./banner-1.webp"
        className={styles.heroImage}
        alt="Hero Banner"
      />

      <div className={styles.heroContent}>
        <div className={styles.textBox}>
          <h1 className={styles.title}>Modest Muse</h1>
          <p className={styles.subtitle}>Abaya Collection 2025</p>
          <button className={styles.shopBtn}>Shop Now</button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
