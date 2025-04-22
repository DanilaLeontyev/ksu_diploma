import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Table, Button, Space, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { addToCart, deleteFromCart, setCartId } from "../store/cartSlice";
import { Product } from "../types";
import { ColumnsType } from "antd/es/table";
import { useCreateOrderMutation } from "../store/api/productApi";
import { useNavigate } from "react-router";

const { Title } = Typography;

function Cart() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns: ColumnsType<Product> = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      width: "20%",
      render: (price: number) => `${price.toFixed(2)} ₽`,
    },
    {
      title: "Количество",
      dataIndex: "quantity",
      key: "quantity",
      width: "20%",
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
      title: "Итог",
      key: "total",
      render: (_: any, record: Product) =>
        `${(record.price * record.quantity).toFixed(2)} ₽`,
    },
  ];

  const handleCreateOrder = () => {
    const ids: string[] = cart
      .map((product) => {
        const copyIds = [];
        if (product.quantity > 0) {
          for (let i = 0; i < product.quantity; i++) {
            copyIds.push(product.id);
          }
        }
        return copyIds;
      })
      .flat();

    createOrder({
      productIds: ids,
    })
      .then((res) => {
        if (res.data?.responseObject) {
          dispatch(setCartId(res.data.responseObject));
          navigate(`/order/${res.data.responseObject}`);
        }
      })
      .catch((error) => {
        console.error("Ошибка при создании заказа:", error);
        alert("Ошибка при создании заказа. Пожалуйста, попробуйте еще раз.");
      });
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Ваш заказ</Title>
      <Table
        dataSource={cart}
        columns={columns}
        rowKey="id"
        pagination={false}
        summary={(pageData) => {
          let total = 0;
          pageData.forEach(({ price, quantity }) => {
            total += price * quantity;
          });
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3} align="right" index={0}>
                <strong>Всего:</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={0}>
                <strong>{total.toFixed(2)} ₽</strong>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
      <Button
        type="primary"
        style={{ marginTop: "16px" }}
        onClick={handleCreateOrder}
        disabled={cart.length === 0}
      >
        Создать заказ
      </Button>
    </div>
  );
}

export default Cart;
