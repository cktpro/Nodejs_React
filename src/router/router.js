import React from 'react';
import { LOCATIONS } from 'constants/index';

import Layouts from 'components/layout';
import Main from 'components/main';
import ProductsPage from 'pages/productsPage';
import LoginPage from 'pages/loginPage';
import Details from 'pages/productsPage/details';
import Category from 'components/category';
import Supplier from 'components/supplier';
import NotFoundPage from 'pages/NotFoundPage';
import ManualAntUpload from 'components/media';
import Logout from 'components/logout';
import MyProfile from 'pages/myProfile';
export const routers = [
  {
    path: LOCATIONS.HOME_PAGE,
    name: "Layout",
    element: <Layouts />,
    children: [
      { isRoot: true, name: "Home", element: <Main/> },
      { path: LOCATIONS.PRODUCTS, name: "Product Page", element: <ProductsPage/> },
      { path: LOCATIONS.ADD_PRODUCT, name: "Add Product", element: <ProductsPage/> },
      { path: LOCATIONS.PRODUCT_DETAILS, name: "Product Details", element:<Details/> },
      { path: LOCATIONS.CATEGORY, name: "Category List", element:<Category/> },
      { path: LOCATIONS.ADD_CATEGORY, name: "Add Category", element:<Category/> },
      { path: LOCATIONS.SUPPLIER, name: "Supplier List", element:<Supplier/> },
      { path: LOCATIONS.ADD_SUPPLIER, name: "Add Supplier", element:<Supplier/> },
      { path: LOCATIONS.UPLOAD, name: "Upload Page", element:<ManualAntUpload/> },
      { path: LOCATIONS.LOGOUT, name: "Logout", element:<Logout/> },
      { path: LOCATIONS.MY_PROFILE, name: "My Profile", element:<MyProfile/> },
      
      { path: "*", element: <NotFoundPage /> },

    ]
  },
//   { path: LOCATIONS.COUNTER, name: "Counter", element: <CounterApp /> },
//   { path: LOCATIONS.TODO, name: "Todo", element: <TodoApp /> },
//   { path: LOCATIONS.PRODUCTS_PAGE, name: "Products", element: <ProductsPage2 /> },
//   { path: LOCATIONS.PRODUCTS_DETAIL_PAGE, name: "Products Detail", element: <ProductsDetail /> },
  
];

export const unAuthRouter = [
  { path: "*", name: "Login Page", element: <LoginPage/> },
];