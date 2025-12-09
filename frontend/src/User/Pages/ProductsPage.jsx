import React from "react";
import Products from "../Components/Products";

function ProductPages() {
  const data = [
    {
      title: "ABAYAS",
      products: [
        { name: "Double Layered Abaya", price: "Rs.5,999", img: "product.abaya1.jpg" },
        { name: "Satin Pink Pearl Abaya", price: "Rs.7,999", img: "product.abaya2.jpg" },
        { name: "Emre Flowy Abaya", price: "Rs.4,999", img: "product.abaya3.jpg" },
      ],
    },
    {
      title: "HIJABS",
      products: [
        { name: "SILK Hijab", price: "Rs.999", img: "product.hijab1.jpg" },
        { name: "Georgette Hijab", price: "Rs.999", img: "product.hijab2.jpg" },
        { name: "CHIFFON Hijab", price: "Rs.1999", img: "product.hijab3.jpg" },
      ],
    },
    {
      title: "NIQABS",
      products: [
        { name: "Pink Half Niqab", price: "Rs.499", img: "product.niqab1.jpg" },
        { name: "Beige Half Niqab", price: "Rs.499", img: "product.niqab2.jpg" },
        { name: "Pastel Half Niqab", price: "Rs.499", img: "product.niqab3.jpg" },
      ],
    },
    {
      title: "SCRUNCHIES",
      products: [
        { name: "Satin Scrunchie", price: "Rs.250", img: "product.scrunchie1.jpg" },
        { name: "Silk Scrunchie", price: "Rs.250", img: "product.scrunchie2.jpg" },
        { name: "Chiffon Scrunchie", price: "Rs.250", img: "product.scrunchie3.jpg" },
      ],
    },
  ];

  return (
    <div>
      {data.map((category, index) => (
        <Products key={index} title={category.title} products={category.products} />
      ))}
    </div>
  );
}

export default ProductPages;
