import React from "react";
import styles from "../Styles/products.module.css";

function Products({ title, products }) {
  return (
    <div className={styles.productsSection}>
      <h2 className={styles.productsTitle}>{title}</h2>
      <div className={styles.productsRow}>
        {products.map((product, index) => (
          <div className={styles.productCard} key={index}>
            <img src={product.img} alt={product.name} />
            <p className={styles.productName}>{product.name}</p>
            <p className={styles.productPrice}>{product.price}</p>
          </div>
        ))}
      </div>
      <button className={styles.viewAllBtn}>View All</button>
    </div>
  );
}

export default Products;
