import React from "react";
import styles from "../Styles/SustainabilitySection.module.css";

function SustainabilitySection() {
  return (
    <section className={styles.sustainabilitySection}>
      <div className={styles.imageContainer}>
        <img src="./sustainability.jpg" alt="Modest Muse craftsmanship" />
      </div>
      <div className={styles.textContainer}>
        <h2>
          UNIQUE & <span>Thoughtfully Made</span>
        </h2>
        <p>
          Every piece at Modest Muse is designed with intention — blending luxurious
          fabrics with timeless silhouettes. We believe in conscious fashion that
          celebrates modesty while embracing modern femininity.
        </p>
        <button className={styles.shopOutline}>SHOP COLLECTION</button>
      </div>
    </section>
  );
}

export default SustainabilitySection;