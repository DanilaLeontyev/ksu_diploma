import { Card, Checkbox } from "antd";
import { Order } from "../types";

interface OrderCardProps {
  order: Order;
}

function OrderCard(props: OrderCardProps) {
  const { order } = props;
  const { product, paid } = order;
  const { name, price, image } = product;
  return (
    <Card
      hoverable
      cover={
        <img
          alt={name}
          src={image}
          style={{ height: 100, objectFit: "cover" }}
        />
      }
      style={{
        width: 200,
        margin: "16px",
      }}
    >
      <div
        style={{
          height: 50, // Fixed height for the card body
          overflow: "hidden", // Ensures content doesn't overflow
        }}
      >
        <Card.Meta title={name} />
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

        <Checkbox checked={paid} />
      </div>
    </Card>
  );
}

export default OrderCard;
