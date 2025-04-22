import { useParams } from "react-router";
import { useGetOrderQuery } from "../store/api/productApi";
import { Spin } from "antd";
import OrderCard from "../components/OrderCard";
import QRCode from "react-qr-code";

function Order() {
  const { cartId } = useParams();
  const { data, error, isLoading } = useGetOrderQuery({ cartId: cartId || "" });

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Ошибка загрузки</div>;
  }
  console.log("cartId", cartId);
  console.log("qr url", `${window.location.origin}/order/${cartId}`);
  return (
    <div>
      <QRCode value={`${window.location.origin}/order/${cartId}`} />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {data?.map((order, index) => (
          <OrderCard key={order.id + index} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Order;
