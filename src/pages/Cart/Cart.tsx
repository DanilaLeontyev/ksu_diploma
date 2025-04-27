import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Space, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router';
import { addToCart, deleteFromCart, setCartId } from '../../store/cartSlice';
import { useCreateOrderMutation } from '../../store/api/productApi';
import { RootState } from '../../store/store';
import { Product } from '../../types';
import styles from './Cart.module.css';

const { Title } = Typography;

function Cart() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns: ColumnsType<Product> = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price: number) => `${price.toFixed(2)} ₽`,
    },
    {
      title: 'Количество',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 180,
      render: (quantity: number, record: Product) => (
        <Space>
          <Button
            icon={<MinusOutlined />}
            onClick={() => dispatch(deleteFromCart(record))}
            disabled={quantity <= 1}
          />
          {quantity}
          <Button
            icon={<PlusOutlined />}
            onClick={() => dispatch(addToCart(record))}
          />
        </Space>
      ),
    },
    {
      title: 'Итог',
      key: 'total',
      width: 120,
      render: (_: unknown, record: Product) =>
        `${(record.price * record.quantity).toFixed(2)} ₽`,
    },
  ];

  const handleCreateOrder = async () => {
    const ids: string[] = cart.flatMap(product =>
      Array(product.quantity).fill(product.id),
    );

    try {
      const res = await createOrder({ productIds: ids }).unwrap();
      if (res.responseObject) {
        dispatch(setCartId(res.responseObject));
        navigate(`/order/${res.responseObject}`);
      }
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      alert('Ошибка при создании заказа. Пожалуйста, попробуйте еще раз.');
    }
  };

  const totalAmount = cart.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0,
  );

  return (
    <div className={styles.container}>
      <Title className={styles.title} level={2}>
        Ваш заказ
      </Title>

      <div className={styles.tableWrapper}>
        <Table
          className={styles.table}
          dataSource={cart}
          columns={columns}
          rowKey="id"
          pagination={false}
          scroll={{ x: true }}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3} align="right" index={0}>
                <strong>Всего:</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={0}>
                <strong>{totalAmount.toFixed(2)} ₽</strong>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
          bordered
        />
      </div>

      <Button
        type="primary"
        className={styles.orderButton}
        onClick={handleCreateOrder}
        disabled={cart.length === 0}
        loading={isLoading}
      >
        Создать заказ
      </Button>
    </div>
  );
}

export default Cart;
