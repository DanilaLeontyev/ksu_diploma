import React from "react";
import { Card, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Product } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onDeleteFromCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onDeleteFromCart,
}) => {
  const { name, description, price, image, id } = product;

  const cart = useSelector((state: RootState) => state.cart.cart);
  const count = cart.filter((item) => item.id === id).length;
  return (
    <Card
      hoverable
      cover={
        <img
          alt={name}
          src={image}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
      style={{
        width: 300,
        margin: "16px",
      }}
    >
      <div
        style={{
          height: 150, // Fixed height for the card body
          overflow: "hidden", // Ensures content doesn't overflow
        }}
      >
        <Card.Meta title={name} description={description} />
      </div>
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          {price.toFixed(2)} ₽
        </span>
        {count > 0 && (
          <>
            <Button onClick={() => onDeleteFromCart(product)}>-</Button>
            <span style={{ fontSize: "18px" }}>{count}</span>
            <Button onClick={() => onAddToCart(product)}>+</Button>
          </>
        )}
        {count === 0 && (
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => onAddToCart(product)}
          >
            Добавить
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
