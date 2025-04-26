import { Layout as AntLayout, Button, Image } from "antd";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router";
import { RootState } from "../store/store";
import logo from "../assets/logo.png";

const { Header, Content } = AntLayout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "12vh",
  backgroundColor: "transparent",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  height: 100,
  minHeight: "82vh",
  lineHeight: "120px",
  backgroundColor: "transparent"
};

function Layout() {
  const cart = useSelector((state: RootState) => state.cart.cart);

  return (
    <AntLayout style={{backgroundColor: "transparent"}}>
      <Header style={headerStyle}>
        <Link to="/">
          <Image src={logo} width={150} preview={false} />
        </Link>
        <Button type="primary">
          <Link to="/cart">
            Заказ /{" "}
            {cart
              .reduce((prev, cur) => (prev += cur.price * cur.quantity), 0)
              .toFixed(2)}{" "}
            ₽
          </Link>
        </Button>
      </Header>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
    </AntLayout>
  );
}

export default Layout;
