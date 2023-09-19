import React,{useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import {
    UserOutlined,AppstoreOutlined,ShopOutlined,ShoppingFilled
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
              icon: <ShoppingFilled />,
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
                icon: <AppstoreOutlined />,
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
                icon: <ShopOutlined />,
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
            // {
            //   key: "4",
            //   icon: <VideoCameraOutlined />,
            //   label: "Customers",
            //   children: [
            //     {
            //       key: "addcustomer",
            //       label: "Add Customer",
            //     },
            //     {
            //       key: "customers",
            //       label: "Customer List",
            //     },
            //   ],
            // },
            // {
            //   key: "5",
            //   icon: <UploadOutlined />,
            //   label: "Orders",
            //   children: [
            //     {
            //       key: "order_dashboard",
            //       label: "Dashboard",
            //     },
            //     {
            //       key: "orders",
            //       label: "Order List",
            //     },
            //     {
            //       key: "orderprocess",
            //       label: "Order in Process",
            //     },
            //   ],
            // },
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
                {
                  key: "myprofile",
                  label: "My Profile",
                },
                {
                  key: "logout",
                  label: "Logout",
                },
                
              ],
            },
          ]}
        />
      </Sider>
    );
}

export default Slide;