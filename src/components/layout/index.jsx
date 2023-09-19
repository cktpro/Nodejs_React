import React from "react";
import { Layout,  theme,Breadcrumb } from "antd";
import { Outlet } from "react-router-dom";
import Headers from "components/header";
import Slide from "components/slide";
import {useLocation} from 'react-router-dom';
const { Content,Footer } = Layout;
const AdminPage = () => {
  const location=useLocation()
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
      <Layout>
      {/* Slide */}
      <Slide />
      <Layout>
      <Headers/>
      <Breadcrumb
          style={{
            margin: '16px 16px',
          }}
           items={[{ title: 'Home' }, { title: location.pathname.split("/")} ]}
        />
          {/* <Item>Home</Item>
          {}</Item>} */}

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
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminPage;
