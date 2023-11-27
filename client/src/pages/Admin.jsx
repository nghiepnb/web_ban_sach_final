import { Layout, Menu, theme } from "antd";
import React from "react";
import Product from "../components/Product";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const Admin = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["product"]}
          items={menuList}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        ></Header>
        <Content
          style={{
            height: "100%",
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              minHeight: 360,
            }}
          >
            <div className="flex justify-end">
              <Button
                className="mr-3 mb-4"
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  localStorage.removeItem("accessToken");
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </div>
            <Product />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;

const menuList = [
  {
    key: "product",
    label: `Product`,
  },
];
