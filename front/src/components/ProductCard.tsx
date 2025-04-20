import React from "react";
import { Card, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product: { name, description, price, image },
  onAddToCart,
}) => {
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
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={onAddToCart}
        >
          Добавить
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
