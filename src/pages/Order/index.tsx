import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Button, Spin, Alert } from 'antd';
import QRCode from 'react-qr-code';
import {
  useGetOrderQuery,
  usePayOrderMutation,
} from '../../store/api/productApi';
import PaymentModal from '../../components/PaymentModal';
import OrderCard from '../../components/OrderCard';
import { RootState } from '../../store/store';
import styles from './order.module.css';

function Order() {
  const { cartId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isLoading, refetch } = useGetOrderQuery({
    cartId: cartId || '',
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

  const selectedProductSum =
    data
      ?.filter(order => productUIDs.includes(order.productUID) && !order.paid)
      .reduce((sum, order) => sum + order.product.price, 0) || 0;

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return (
      <Alert
        message="Ошибка загрузки"
        description="Не удалось загрузить данные заказа"
        type="error"
        showIcon
        className={styles.errorAlert}
      />
    );
  }

  return (
    <div className={styles.order}>
      <div className={styles.orderLeft}>
        <QRCode value={`${window.location.origin}/order/${cartId}`} />
        <Button
          disabled={selectedProductSum === 0}
          type="primary"
          onClick={onPayment}
          style={{ backgroundColor: '#ffd700', color: 'black' }}
        >
          Оплатить
          {selectedProductSum > 0 && ` / ${selectedProductSum.toFixed(2)}₽`}
        </Button>
      </div>

      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {data?.map((order, index) => (
          <OrderCard key={order.id + index} order={order} />
        ))}
      </div>
      <PaymentModal
        sum={selectedProductSum}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default Order;
