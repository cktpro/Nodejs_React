import React from 'react';
import { Layout, Menu } from 'antd';

import './header.scss';

const {Header}=Layout;
const items1 = ['nav1', 'nav2', 'nav3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
function Headers(props) {
  return (
    <Header
        style={{
          height: "64px",
          display: 'flex',
          alignItems: 'center',
        }}
      > 
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header>
  );
}

export default Headers;