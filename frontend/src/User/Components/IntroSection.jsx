import React from "react";
import styles from "../Styles/IntroSection.module.css";

function IntroSection() {
  return (
    <section className={styles.introSection}>
      <div className={styles.overlay}>
        <p className={styles.subtitle}>ELEGANCE IN EVERY THREAD</p>
        <h1 className={styles.title}>Our Story</h1>
        <p className={styles.text}>
          Modest Muse was created with one purpose — to redefine luxury modestwear.
          Every abaya, hijab, and accessory we craft embodies grace, comfort, and
          timeless sophistication for the modern woman.
        </p>
        <button className={styles.shopBtn}>SHOP NOW</button>
      </div>
    </section>
  );
}

export default IntroSection;