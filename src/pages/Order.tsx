import { useParams } from "react-router";
import { useGetOrderQuery } from "../store/api/productApi";
import { Button, Spin } from "antd";
import OrderCard from "../components/OrderCard";
import QRCode from "react-qr-code";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

function Order() {
  const { cartId } = useParams();
  const { data, error, isLoading } = useGetOrderQuery({ cartId: cartId || "" });
  const productUIDs = useSelector((state: RootState) => state.cart.productUIDs);

  const selectedProductSum = (): number => {
    if (data) {
      const selectedOrders = data.filter((order) =>
        productUIDs.includes(order.productUID)
      );
      const sum = selectedOrders.reduce(
        (acc, val) => (acc += val.product.price),
        0
      );
      return sum;
    }
    return 0;
  };
  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Ошибка загрузки</div>;
  }

  return (
    <div>
      <QRCode value={`${window.location.origin}/order/${cartId}`} />
      <Button type="primary">
        Оплатить / {selectedProductSum().toFixed(2)}
      </Button>
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
