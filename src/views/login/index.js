import React, { useState } from "react";
import "./index.scss";
import { Form, Input, Button, Row, Col } from "antd";
import { reqLogin } from "../../api/account";

export default function Login() {
  const [codeText, setCodeText] = useState('获取验证码')
  const [codeBtnLoading, setCodeBtnLoading] = useState(false)

  const onFinish = (value) => {
    reqLogin(value)
      .then((res) => {
        console.log("login", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getLoginCode = () => {
    setCodeText('aaaaaaaaaaaaa')

    setCodeBtnLoading(true)
  }
  return (
    <div className="login">
      <div className="login-form">
        <Form size="large" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input placeholder="Username..." />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input type="password" placeholder="Password..." />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "请输入验证码!",
              },
            ]}
          >
            <Row gutter={12}>
              <Col span={14}>
                <Input placeholder="Code..." />
              </Col>
              <Col span={10}>
                <Button loading={codeBtnLoading} onClick={getLoginCode} block type="danger">
                  {codeText}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
