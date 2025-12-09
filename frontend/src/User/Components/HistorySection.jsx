import React from "react";
import styles from "../Styles/HistorySection.module.css";

function HistorySection() {
  return (
    <section className={styles.historySection}>
      <div className={styles.historyOverlay}>
        <div className={styles.historyContent}>
          <h2>
            Our <span>Journey</span>
          </h2>
          <p>
            What began as a small vision to craft modest yet elegant abayas has
            grown into a community of women who express confidence through
            simplicity. Modest Muse stands for beauty that speaks softly yet
            leaves a lasting impression.
          </p>
          <button className={styles.shopOutline}>DISCOVER MORE</button>
        </div>
      </div>
    </section>
  );
}

export default HistorySection;