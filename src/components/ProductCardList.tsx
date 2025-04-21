import React from "react";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../store/cartSlice";
import { useGetAllProductsQuery } from "../store/api/productApi";
import { Spin } from "antd";

const ProductCardList: React.FC = () => {
  const { data, error, isLoading } = useGetAllProductsQuery(undefined);
  const dispatch = useDispatch();
  if (isLoading) {
    return <Spin size="large" />;
  }
  if (error) {
    return <div>Error loading products</div>;
  }
  if (data) {
    return (
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(product) => dispatch(addToCart(product))}
            onDeleteFromCart={(product) => dispatch(deleteFromCart(product))}
          />
        ))}
      </div>
    );
  }
};

export default ProductCardList;
