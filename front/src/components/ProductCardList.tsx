import React from "react";
import ProductCard from "./ProductCard";
import { products } from "../products";

const ProductCardList: React.FC = () => {
  const productsData = products;
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {productsData.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => console.log("add to cart")}
        />
      ))}
    </div>
  );
};

export default ProductCardList;
