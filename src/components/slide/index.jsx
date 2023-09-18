import React,{useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from "@ant-design/icons";
  import { Layout, Menu, } from "antd";

import './slide.scss'
  const{Sider}=Layout
function Slide(props) {
    const {collapsed}=props
    const navigate=useNavigate()
    const onClick = useCallback((e) => {
        navigate(e.key)
      }, [navigate]);
    
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo-header" ><h2>Admin</h2></div>
        <div className='title-slide'><h6>App</h6></div>
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
              ],
            },
            {
                key: "2",
                icon: <UserOutlined />,
                label: "Categories",
                children: [
                  {
                    key: "addcategory",
                    label: "Add Category",
                  },
                  {
                    key: "categories",
                    label: "Category List",
                  }
                ],
              },
              {
                key: "3",
                icon: <UserOutlined />,
                label: "Suppliers",
                children: [
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
              key: "4",
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
              key: "5",
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
        <div  className='title-slide'><h6>Pages</h6></div>
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
                  key: "upload",
                  label: "Upload File",
                },
                
              ],
            },
          ]}
        />
      </Sider>
    );
}

export default Slide;