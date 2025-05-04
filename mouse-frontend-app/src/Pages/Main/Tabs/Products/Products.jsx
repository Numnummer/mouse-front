import "./Products.css";
import React, { useState } from "react";
import processPayment from "../../../../Api/Payment/ProcessPayment.js";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([{ name: "asd" }]);
  const handleProductClick = (name) => {
    processPayment(name)
      .then((res) => {
        alert(`Payment started ${res}`);
        toast(`Payment started ${res}`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className={"products-page-container"}>
      {products.map((product, index) => (
        <div
          key={index}
          className="products-page-element"
          onClick={() => handleProductClick(product)}
        >
          {product.name}
        </div>
      ))}
    </div>
  );
}
