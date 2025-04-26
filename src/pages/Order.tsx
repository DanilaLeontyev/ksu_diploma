import { useParams } from "react-router";
import { useGetOrderQuery, usePayOrderMutation } from "../store/api/productApi";
import { Button, Spin } from "antd";
import OrderCard from "../components/OrderCard";
import QRCode from "react-qr-code";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import PaymentModal from "../components/PaymentModal";
import { useState } from "react";

function Order() {
  const { cartId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isLoading, refetch } = useGetOrderQuery({
    cartId: cartId || "",
  });
  const productUIDs = useSelector((state: RootState) => state.cart.productUIDs);
  const [payOrder] = usePayOrderMutation();

  const onPayment = async () => {
    if (cartId) {
      showModal();
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    if (cartId) {
      await payOrder({ productUIDs, cartId });
      await refetch();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      <Button type="primary" onClick={() => onPayment()}>
        Оплатить / {selectedProductSum().toFixed(2)} ₽
      </Button>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {data?.map((order, index) => (
          <OrderCard key={order.id + index} order={order} />
        ))}
      </div>
      <PaymentModal
        sum={selectedProductSum()}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default Order;
