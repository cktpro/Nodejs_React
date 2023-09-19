// import
import React, { memo, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Space,
  Table,
  Form,
  Button,
  Popconfirm,
  Modal,
  message,
  Row,
  Col,
  Pagination,
  Select,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { axiosClient } from "helper/axiosClient";
import axios from "axios";
import ProductsForm from "./productsForm";
const url = process.env.REACT_APP_BASE_URL_USER;
function Products() {
  // variable
  const DEFAULT_LIMIT = 5;
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: DEFAULT_LIMIT,
  });
  const [search, setSearch] = useState({
    categoryId: undefined,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [updateForm] = Form.useForm();

  const onSelectProduct = useCallback(
    (data) => () => {
      setEditModalVisible(true);

      setSelectedProduct(data);

      updateForm.setFieldsValue(data);
    },
    [updateForm]
  );

  const onFinish = useCallback(async (values) => {
    try {
      const formData = new FormData();
      formData.append("file", values.upload.file);

      const img = await axios.post(
        `${url}media/upload-single`,
        formData
      );
      const {
        name,
        price,
        discount,
        stock,
        description,
        categoryId,
        supplierId,
      } = values;
      const data = {
        name,
        price,
        discount,
        stock,
        description,
        categoryId,
        supplierId,
        mediaId: `${img.data.payload._id}`,
      };

      console.log("◀◀◀ data ▶▶▶", data);
      await axiosClient.post("/products", data);
      message.success("Thêm sản phẩm thành công");
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
      if (error?.response?.data?.error) {
        const { code, keyValue } = error.response.data.error;
        if (code === 11000) {
          return message.error(`Mã sản phẩm ${keyValue.name} đã tồn tại`);
        }
      }
      return message.error("Thêm sản phẩm thất bại");
    }
  }, []);
  const onDeleteFinish = useCallback(
    (id) => async () => {
      try {
        await axiosClient.patch(`/products/delete/${id}`);

        setRefresh(refresh + 1);
        message.success("Xóa thành công");
      } catch (error) {
        message.error("Xóa thất bại");
      }
    },
    [refresh]
  );
  const onEditFinish = useCallback(
    async (data) => {
      try {
        if (data.upload) {
          const formData = new FormData();
          formData.append("file", data.upload.file);

          const img = await axios.post(
            `${url}media/upload-single`,
            formData
          );
          const dataInsert = {
            name: data.name,
            price: data.price,
            discount: data.discount,
            stock: data.stock,
            description: data.description,
            categoryId: data.categoryId,
            supplierId: data.supplierId,
            mediaId: `${img.data.payload._id}`,
          };
          await axiosClient.put(`/products/${selectedProduct._id}`, dataInsert);
        } else {
          await axiosClient.put(`/products/${selectedProduct._id}`, data);
        }
        setRefresh(refresh + 1);
        updateForm.resetFields();
        setEditModalVisible(false);
        message.success("Cập nhật thành công");
      } catch (error) {
        message.error("Cập nhật thất bại");
      }
    },
    [selectedProduct, updateForm, refresh]
  );

  const getProductData = useCallback(async () => {
    try {
      const res = await axiosClient.get(
        `/products?page=${pagination.page}&pageSize=${pagination.pageSize}${
          search.categoryId ? `&categoryId=${search.categoryId}` : ""
        }`
      );
      setProducts(res.data.payload);
      setPagination((prev) => ({
        ...prev,
        total: res.data.total,
      }));
    } catch (error) {
      console.log(error);
    }
  }, [pagination.page, pagination.pageSize, search.categoryId]);
  const getSuppliers = useCallback(async () => {
    try {
      const res = await axiosClient.get("suppliers");
      setSuppliers(res.data.payload);
    } catch (err) {
      console.log("◀◀◀ err ▶▶▶", err);
    }
  }, []);
  const getCategories = useCallback(async () => {
    try {
      const res = await axiosClient.get("/category");
      setCategories(res.data.payload);
    } catch (err) {
      console.log("◀◀◀ err ▶▶▶", err);
    }
  }, []);
  const onChangePage = useCallback((page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  }, []);

  useEffect(() => {
    getSuppliers();

    getCategories();
  }, [getCategories, getSuppliers]);
  useEffect(() => {
    getProductData();
  }, [getProductData, search, refresh]);
  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Name",
      key: "name",
      render: (text, record, index) => {
        return <Link to={`/product_details/${record._id}`}>{record.name}</Link>;
      },
    },
    {
      title: "Hình ảnh",
      key: "mediaId",
      render: (text, record, index) => {
        if (record.image)
          return (
            <img
              src={`${url}${
                record.image.location.split("public", 2)[1]
              }`}
              alt=""
              width="100px"
              height="100px"
            />
          );
        //<img src={`http://localhost:3005${record.image.location.split('public',2)[1]}`} alt="" width="100px" height="100px"/>
        return (
          <img
            src={require("assets/images/noimage.jpg")}
            alt=""
            width="100px"
            height="100px"
          />
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => {
        return <span style={{ color: "gray" }}>${record.price}</span>;
      },
    },
    {
      title: "Discount",
      key: "discount",
      dataIndex: "discount",
    },
    {
      title: "Discounted Price",
      key: "discountedPrice",
      render: (text, record, index) => {
        return (
          <span style={{ color: "green", fontWeight: "700" }}>
            ${(record.price * (100 - record.discount)) / 100}
          </span>
        );
      },
    },

    {
      title: "Stock",
      key: "stock",
      dataIndex: "stock",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={onSelectProduct(record)}
            />

            <Popconfirm
              title="Are you sure to delete?"
              okText="Đồng ý"
              cancelText="Đóng"
              onConfirm={onDeleteFinish(record._id)}
              //   onConfirm={console.log(record.id)}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const handleChange = (value) => {
    console.log("◀◀◀ choose ▶▶▶", value);
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
    setSearch((prev) => {
      if (value === "all") {
        return {
          ...prev,
          categoryId: null,
        };
      }
      return {
        ...prev,
        categoryId: value,
      };
    });
  };
  return (
    // main
    <>
      <Row>
        <Col span={20}>
          <h1>Products</h1>
        </Col>
        <Col span={4} className="text-end">
          <Button
            type="primary"
            className="my-3"
            onClick={() => {
              setIsHidden((prev) => !prev);
            }}
          >
            {isHidden ? "Add Product" : "Close"}
          </Button>
        </Col>
      </Row>

      {!isHidden ? (
        <div className="container">
          <ProductsForm
            suppliers={suppliers}
            categories={categories}
            formName="add-product-form"
            onFinish={onFinish}
          />
        </div>
      ) : null}
      <Row>
        <Col className="mb-2">
          <Select
            defaultValue="all"
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <Select.Option value="all">Tất cả danh mục</Select.Option>
            {categories.map((item) => {
              return (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Col>
      </Row>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={products}
        pagination={false}
      />
      <Pagination
        defaultCurrent={pagination.page}
        total={pagination.total}
        pageSize={pagination.pageSize}
        onChange={onChangePage}
      />
      <Modal
        open={editModalVisible}
        centered
        title="Cập nhật thông tin"
        onCancel={() => {
          setEditModalVisible(false);
        }}
        cancelText="Đóng"
        okText="Lưu"
        onOk={() => {
          updateForm.submit();
        }}
      >
        <ProductsForm
          form={updateForm}
          suppliers={suppliers}
          categories={categories}
          onFinish={onEditFinish}
          formName="update-product"
          isHiddenSubmit
        />
      </Modal>
    </>
  );
}
export default memo(Products);
