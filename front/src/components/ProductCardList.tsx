import React from "react";
import ProductCard from "./ProductCard";
import { products } from "../products";
import { useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../store/cartSlice";

const ProductCardList: React.FC = () => {
  const productsData = products;

  const dispatch = useDispatch();

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {productsData.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={(product) => dispatch(addToCart(product))}
          onDeleteFromCart={(product) => dispatch(deleteFromCart(product))}
        />
      ))}
    </div>
  );
};

export default ProductCardList;
