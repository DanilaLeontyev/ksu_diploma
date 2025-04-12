import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router";

const { Header, Content, Footer } = AntLayout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  minHeight: "10vh",
  paddingInline: 48,
  lineHeight: "64px",
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
  return (
    <AntLayout>
      <Header style={headerStyle}>Header</Header>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </AntLayout>
  );
}

export default Layout;
