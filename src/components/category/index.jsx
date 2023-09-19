// import
import React, { memo, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Space,Table,Form,Button,Popconfirm,Modal,message,Pagination,Row,Col
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CategoryForm from "./categoryForm";
import { axiosClient } from "helper/axiosClient";
function Category() {
  // variable
  const DEFAULT_LIMIT = 4;
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: DEFAULT_LIMIT,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [updateForm] = Form.useForm();
  const [isHidden, setIsHidden] = useState(true);

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
      await axiosClient.post("/category/",values);

      message.success('Thêm mới thành công');

      setRefresh(refresh + 1);
      setIsHidden(true);
    } catch (error) {
      console.log('◀◀◀ error ▶▶▶',error);
    }
  }, [refresh]);
  const onDeleteFinish = useCallback(
    (id) => async () => {
      try {
         await axiosClient.patch(`/category/delete/${id}`);

        setRefresh(refresh + 1);
        message.success('Xóa thành công');
      } catch (error) {
        if (error?.response?.data?.errors) {
          error.response.data.errors.map((e) => console.log("◀◀◀ e ▶▶▶", e));
        }
      }
    },
    [refresh]
  );
  const onEditFinish = useCallback(
    async (data) => {
      try {
         await axiosClient.put(
          `/category/${selectedProduct._id}`,
          data
        );

        setRefresh(refresh + 1);
        updateForm.resetFields();

        setEditModalVisible(false);
        message.success('Cập nhật thành công');
      } catch (error) {
        if (error?.response?.data?.errors) {
            message.fail('Cập nhật thất bại');
          error.response.data.errors.map((e) => console.log("◀◀◀ e ▶▶▶", e));
        }
      }
    },
    [selectedProduct, updateForm,refresh]
  );
  const getCategories = useCallback(async () => {
    try {
      const res = await axiosClient.get(`/category?page=${pagination.page}&pageSize=${pagination.pageSize}`);
      setCategories(res.data.payload);
      setPagination((prev) => ({
        ...prev,
        total: res.data.total,
      }));
    } catch (err) {
      console.log("◀◀◀ err ▶▶▶", err);
    }
  }, [pagination.page, pagination.pageSize]);
  const onChangePage = useCallback(
    (page, pageSize) => {
      setPagination((prev) => ({
        ...prev,
        page,
        pageSize,
      }));

    },
    []
  );

  useEffect(() => {
    getCategories();
  }, [getCategories,refresh]);
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
  return (
    // main
    <>
    <Row>
        <Col span={20}>
          <h1>Category</h1>
        </Col>
        <Col span={4} className="text-end">
          <Button
            type="primary"
            className="my-3"
            onClick={() => {
              setIsHidden((prev) => !prev);
            }}
          >
            {isHidden ? "Add Category" : "Close"}
          </Button>
        </Col>
      </Row>
      {!isHidden ? (
        <CategoryForm
        onFinish={onFinish}
        />
      ) : null}
    
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={categories}
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
        <CategoryForm
          form={updateForm}
          onFinish={onEditFinish}
          formName="update-product"
          isHiddenSubmit
        />
      </Modal>
    </>
  );
}
export default memo(Category);
