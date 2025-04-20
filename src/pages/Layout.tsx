import { Layout as AntLayout, Button, Image } from "antd";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router";
import { RootState } from "../store/store";
import logo from "../assets/logo.png";

const { Header, Content, Footer } = AntLayout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "12vh",
  backgroundColor: "#F8E7F6",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  height: 100,
  minHeight: "80vh",
  lineHeight: "120px",
  backgroundColor: "#F5F5F5",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  minHeight: "10vh",
  backgroundColor: "#F8E7F6",
};

function Layout() {
  const cart = useSelector((state: RootState) => state.cart.cart);

  return (
    <AntLayout>
      <Header style={headerStyle}>
        <Image src={logo} width={150} />
        <Button type="primary">
          <Link to="/cart">
            Заказ /{" "}
            {cart.reduce((prev, cur) => (prev += cur.price), 0).toFixed(2)} ₽
          </Link>
        </Button>
      </Header>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </AntLayout>
  );
}

export default Layout;
