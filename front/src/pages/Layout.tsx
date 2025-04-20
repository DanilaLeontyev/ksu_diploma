import { Layout as AntLayout, Button } from "antd";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router";
import { RootState } from "../store/store";

const { Header, Content, Footer } = AntLayout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 48,
  minHeight: "6vh",
  paddingInline: 24,
  lineHeight: "48px",
  backgroundColor: "#F8E7F6",
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
