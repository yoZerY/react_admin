import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom'
import CryptoJs from 'crypto-js'
import { setToken } from '../../utils/utils.js'
import "./index.scss";
import { Form, Input, Button, Row, Col, notification, message } from "antd";
import { reqLogin, reqGetCode } from "../../api/account";

export default function Login(props) {
  const timer = useRef(0)
  const [userName, setUserName] = useState('')
  const [codeText, setCodeText] = useState('获取验证码')
  const [codeBtnLoading, setCodeBtnLoading] = useState(false)
  const [loginBtnLoading, setLoginBtnLoading] = useState(false)

  const userNameChangeEvent = (e) => {
    const userName = e.target.value
    setUserName(userName)
  }
  const onFinish = (value) => {
    const { username, password, code } = value
    const secretPassword = CryptoJs.MD5(password).toString()
    const data = {
      username,
      password: secretPassword,
      code
    }
    setLoginBtnLoading(true)
    reqLogin(data)
      .then((res) => {
        if (res.data.resCode === 0) {
          clearInterval(timer.current)
          setLoginBtnLoading(false)
          const token = res.data.data.token
          setToken(token)
          message.success(res.data.message)
          props.history.push('/')
        } else {
          setLoginBtnLoading(false)
          message.warning(res.data.message)
        }
      })
  };
  const countDown = () => {
    let sec = 60
    setCodeBtnLoading(true)
    timer.current = setInterval(() => {
      sec--
      if (sec <= 0) {
        setCodeText('重新获取')
        setCodeBtnLoading(false)
        clearInterval(timer.current)
        return
      } else {
        let text = sec + 'S'
        setCodeText(text)
      }
    }, 1000)
  }
  const getLoginCode = () => {
    if (!userName) {
      return message.warning('请输入用户名')
    }
    countDown()
    const data = {
      username: userName,
      module: 'login'
    }
    reqGetCode(data).then(res => {
      notification.success({
        message: res.data.message,
      });
    })
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
                message: "请输入用户名",
              },
            ]}
          >
            <Input onChange={userNameChangeEvent} placeholder="Username..." />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
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
                message: "请输入验证码",
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
            <Button loading={loginBtnLoading} type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className='go-register'>
          <Link to='/register'>去注册......</Link>
        </div>

      </div>
    </div>
  );
}
