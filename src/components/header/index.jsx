import React from 'react';
import { Layout } from 'antd';

import './header.scss';

const {Header}=Layout;
function Headers(props) {
  return (
    <Header
        style={{
          height: "64px",
          display: 'flex',
          alignItems: 'center',
        }}
      > 
      </Header>
  );
}

export default Headers;