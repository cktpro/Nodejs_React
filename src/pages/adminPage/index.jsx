import React, { useCallback, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const AdminPage = () => {
    const navigate=useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onClick = useCallback((e) => {
    navigate(e.key)
  }, [navigate]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div><h6>Application</h6></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={onClick}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Products",
              children: [
                {
                  key: "addproduct",
                  label: "Add Product",
                },
                {
                  key: "products",
                  label: "Products List",
                },
                {
                  key: "addcategory",
                  label: "Add Category",
                },
                {
                  key: "categories",
                  label: "Category List",
                },
                {
                  key: "addsupplier",
                  label: "Add Supplier",
                },
                {
                  key: "suppliers",
                  label: "Supplier List",
                },
              ],
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Customers",
              children: [
                {
                  key: "addcustomer",
                  label: "Add Customer",
                },
                {
                  key: "customers",
                  label: "Customer List",
                },
              ],
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Orders",
              children: [
                {
                  key: "order_dashboard",
                  label: "Dashboard",
                },
                {
                  key: "orders",
                  label: "Order List",
                },
                {
                  key: "orderprocess",
                  label: "Order in Process",
                },
              ],
            },
          ]}
        />
        <div><h6>Pages</h6></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={onClick}
          items={[
            {
              key: "4",
              icon: <UserOutlined />,
              label: "Authentication",
              children: [
                {
                  key: "addproduct",
                  label: "Add Product",
                },
                {
                  key: "products",
                  label: "Products List",
                },
                {
                  key: "addcategory",
                  label: "Add Category",
                },
                {
                  key: "categories",
                  label: "Category List",
                },
                {
                  key: "addsupplier",
                  label: "Add Supplier",
                },
                {
                  key: "suppliers",
                  label: "Supplier List",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminPage;
