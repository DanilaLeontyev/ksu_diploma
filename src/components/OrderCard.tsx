import { Card, Checkbox } from "antd";
import { Order } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { checkedForPaymentsIds } from "../store/cartSlice";

interface OrderCardProps {
  order: Order;
}

function OrderCard(props: OrderCardProps) {
  const { order } = props;
  const { product, paid, productUID } = order;
  const { name, price, image } = product;
  const dispatch = useDispatch();
  const productUIDs = useSelector((state: RootState) => state.cart.productUIDs);

  const isChecked = productUIDs.includes(productUID);
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
        opacity: paid ? "0.1" : "1.0",
        cursor: paid ? "default" : "pointer",
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
          {price.toFixed(2)} ₽<br />
        </span>
        <span>{paid.toString()}</span>
        <Checkbox
          disabled={paid}
          checked={isChecked}
          onChange={() => {
            dispatch(checkedForPaymentsIds(productUID));
          }}
        />
      </div>
    </Card>
  );
}

export default OrderCard;
