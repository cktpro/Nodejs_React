import React, { memo } from "react";
import { Button, Form, Input, } from "antd";

function SupplierForm(props) {
  const {
    isHiddenSubmit,
    formName,
    form,
    optionStyle,
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
        <Form.Item
          label="Tên nhà cung cấp"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên nhà cung cấp" },
            { max: 50, message: "Tối đa 50 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Email không hợp lệ",
            },
            {
              max: 50,
              message: "Email không vượt quá 50 ký tự",
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          extra="Ví dụ: +840xxxxxxxxxx"
          rules={[
            {
              pattern: /(84)+([0-9]{10})\b/,
              message: "Số điện thoại không hợp lệ",
            },
            {
              max: 500,
              message: "Mô tả không vượt quá 500 ký tự",
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[
            {
              max: 500,
              message: "Mô tả không vượt quá 500 ký tự",
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
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

export default memo(SupplierForm)
