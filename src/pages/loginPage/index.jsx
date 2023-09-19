import React, { memo } from "react";
import { Button, Checkbox, Form, Input,message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionLogin } from "store/auth/action";
import "./loginPage.scss";

function LoginPage(props) {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(actionLogin(values));
  };
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  if (isLogin) {
    message.success('Đăng nhập thành công');
      setTimeout(() => {
        window.location.replace("/");
      } , 1000);

  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="form">
      <h1>Đăng nhập</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Email is not valid",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          extra="Login with cktpro@gmail.com - 123456"
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default memo(LoginPage);
