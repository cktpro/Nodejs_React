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
  Pagination,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { axiosClient } from "helper/axiosClient";
import SupplierForm from "./supplierForm";
function Supplier() {
  // variable
  const DEFAULT_LIMIT = 5;
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: DEFAULT_LIMIT,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [suppliers, setSupplier] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const onSelectProduct = useCallback(
    (data) => () => {
      setEditModalVisible(true);

      setSelectedProduct(data);

      updateForm.setFieldsValue(data);
    },
    [updateForm]
  );

  //   const onShowMessage = useCallback(
  //     (content, type = MESSAGE_TYPE.SUCCESS) => {
  //       messageApi.open({
  //         type: type,
  //         content: content,
  //       });
  //     },
  //     [messageApi]
  //   );
  const onFinish = useCallback(
    async (values) => {
      await axiosClient
        .post("/suppliers", values)
        .then(function (response) {
          setRefresh(refresh + 1);
          message.success("Thành công");
        })
        .catch(function (error) {
          message.error("Thất bại");
        });
    },
    [refresh]
  );
  const onDeleteFinish = useCallback(
    (id) => async () => {
      try {
        const res = await axiosClient.patch(`/suppliers/delete/${id}`);

        getSupplier();
        // setRefresh(refresh + 1);

        // const newItem = res.data.payload;

        // setProducts((preState) => ([
        //   ...preState,
        //   newItem,
        // ]))
      } catch (error) {
        if (error?.response?.data?.errors) {
          error.response.data.errors.map((e) => console.log("◀◀◀ e ▶▶▶", e));
        }
      }
    },
    []
  );
  const onEditFinish = useCallback(
    async (data) => {
      try {
        const res = await axiosClient.put(
          `/category/${selectedProduct._id}`,
          data
        );

        setRefresh(refresh + 1);
        updateForm.resetFields();

        setEditModalVisible(false);
        message.success("Cập nhật thành công");
      } catch (error) {
        if (error?.response?.data?.errors) {
          error.response.data.errors.map((e) => message.error(e));
        }
      }
    },
    [selectedProduct, updateForm, refresh]
  );
  const getSupplier = useCallback(async () => {
    try {
      const res = await axiosClient.get("/suppliers");
      setSupplier(res.data.payload);
    } catch (err) {
      console.log("◀◀◀ err ▶▶▶", err);
    }
  }, []);
  const onChangePage = useCallback(
    (page, pageSize) => {
      setPagination((prev) => ({
        ...prev,
        page,
        pageSize,
      }));

      getSupplier();
    },
    [getSupplier]
  );

  useEffect(() => {
    getSupplier();
  }, [getSupplier, refresh]);
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
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      key: "phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
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
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    // main
    <>
      <SupplierForm onFinish={onFinish} />
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={suppliers}
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
        <SupplierForm
          form={updateForm}
          onFinish={onEditFinish}
          formName="update-product"
          isHiddenSubmit
        />
      </Modal>
    </>
  );
}
export default memo(Supplier);
