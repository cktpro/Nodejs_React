import React, { memo } from "react";
import { Button, Form, Input, InputNumber, Select,Upload  } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
function ProductsForm(props) {
  const {
    isHiddenSubmit,
    formName,
    form,
    optionStyle,
    suppliers,
    categories,
    onFinish,
    className
  } = props;
  return (
    <div className="w-75 mx-auto">
      <Form
        form={form}
        className={className}
        name={formName}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={optionStyle}
        onFinish={onFinish}
      >
        {/* <Form.Item
          label="Giới tính"
          name="gender"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giới tính",
            },
          ]}
        >
          <Select
            options={[
              {
                value: "male",
                label: "Nam",
              },
              {
                value: "female",
                label: "Nữ",
              },
              {
                value: "other",
                label: "Khác",
              },
            ]}
          >
            {/* <Option value="male">Nam</Option>
          <Option value="female">Nữ</Option>
          <Option value="other">Khác</Option> */}
          {/* </Select>
        </Form.Item> */} 
        <Form.Item
          label="Nhà cung cấp"
          name="supplierId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn nhà cung cấp",
            },
          ]}
        >
          <Select>
            {suppliers.map((s) => (
              <Option key={s.id || s._id} value={s.id || s._id}>{s.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Loại sản phẩm"
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại sản phẩm",
            },
          ]}
        >
          <Select>
            {categories.map((s) => (
              <Option key={s.id || s._id} value={s.id || s._id}>{s.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên sản phẩm" },
            { max: 50, message: "Tối đa 50 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          name="upload"
        >
        <Upload
          name="file"
          beforeUpload={true}
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        </Form.Item>
        <Form.Item
          label="Giá gốc"
          name="price"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Vui lòng nhập giá gốc từ 0",
            },
            { required: true, message: "Vui lòng nhập giá gốc" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Chiết khấu (%)"
          name="discount"
          rules={[
            {
              type: "number",
              min: 0,
              max: 75,
              message: "Vui lòng nhập giảm giá từ 0 đến 75",
            },
            { required: true, message: "Vui lòng nhập giảm giá" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Tồn kho"
          name="stock"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Vui lòng nhập tồn kho lớn hơn 0",
            },
            { required: true, message: "Vui lòng nhập tồn kho" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input />
        </Form.Item>

        {!isHiddenSubmit && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  )
}

export default memo(ProductsForm)
