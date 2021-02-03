import React, { useState } from "react";
import { Link } from 'react-router-dom'
import CryptoJs from 'crypto-js'
import "./index.scss";
import { Form, Input, Button, Row, Col, notification, message } from "antd";
import { reqGetCode, reqRegister } from "../../api/account";

export default function Register() {
    const [userName, setUserName] = useState('')
    const [codeText, setCodeText] = useState('获取验证码')
    const [codeBtnLoading, setCodeBtnLoading] = useState(false)

    const userNameChangeEvent = (e) => {
        const userName = e.target.value
        setUserName(userName)
    }
    const onFinish = (value) => {
        const { password, username, code } = value
        const secretPassword = CryptoJs.MD5(password).toString()
        const data = {
            username,
            password: secretPassword,
            code
        }
        reqRegister(data).then(res => {
            if (res.data.resCode === 0) {
                message.success(res.data.message)
            } else {
                message.warning(res.data.message)
            }
        })

    };
    const countDown = () => {
        let timer = null
        let sec = 60
        setCodeBtnLoading(true)
        timer = setInterval(() => {
            sec--
            if (sec <= 0) {
                setCodeText('重新获取')
                setCodeBtnLoading(false)
                clearInterval(timer)
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
            module: 'register'
        }
        reqGetCode(data).then(res => {
            notification.success({
                message: res.data.message,
            });
        })
    }
    return (
        <div className="register">
            <div className="register-form">
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
                        name="passwordAgain"
                        rules={[
                            {
                                required: true,
                                message: "请再次输入密码",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject('两次密码不一致')
                                    }
                                }
                            })
                        ]}
                    >
                        <Input type="password" placeholder="Password Again..." />
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
                        <Button type="primary" htmlType="submit" block>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <div className='go-login'>
                    <Link to='/login'>去登录......</Link>
                </div>

            </div>
        </div>
    );
}
