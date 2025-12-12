import React from "react";
import styles from "../Styles/Categories.module.css";
import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    { name: "Abayas", image: "./cat.abayas.jpg" },
    { name: "Hijabs", image: "./cat.hijabs.jpg" },
    { name: "Niqabs", image: "./cat.niqabs.jpg" },
    { name: "Scrunchies", image: "./cat.scrunchies.jpg" },
    { name: "Undercaps", image: "./cat.undercaps.jpg" },
    { name: "Hand Gloves", image: "./cat.gloves.jpg" }
  ];

  return (
    <div className={`container-fluid ${styles.categoriesSection}`}>
      <h2 className={styles.heading}>Products Collections</h2>
      <div className="container my-5">
        <div className="row">
          {categories.map((item, index) => (
            <div key={index} className="col-6 col-md-4 mb-4">
              <Link 
                to={`/products/${item.name}`} 
                className={styles.categoryLink} // CSS class for link
              >
                <div className={styles.categoryCard}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`${styles.categoryImage} img-fluid w-100`}
                  />
                  <h5 className={styles.categoryName}>{item.name}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;