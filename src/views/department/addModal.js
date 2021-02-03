import React, { useState, useImperativeHandle } from 'react'
import { reqAddDepartment } from '../../api/department'
import { Drawer, Button, Space, Form, Input, Radio, InputNumber, message } from 'antd'
const { TextArea } = Input;
const formLayout = {
    labelCol: { span: 3 }
}

export default function AddDepartmentModel({ addModalRef, queryTableData }) {
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false)
    const [vusible, setVisible] = useState(false)

    useImperativeHandle(addModalRef, () => ({
        changeVisible: () => {
            setVisible(true)
        }
    }))

    const onFinish = (value) => {
        setSubmitLoading(true)
        reqAddDepartment(value).then(res => {
            message.success(res.data.message)
            form.resetFields()
            setVisible(false)
            queryTableData()
            setSubmitLoading(false)
        })
    }
    const resetForm = () => {
        form.resetFields()
    }
    const closeDrawer = () => {
        form.resetFields()
        setVisible(false)
    }
    return (
        <Drawer onClose={closeDrawer} title="添加部门" visible={vusible} width='50%'>
            <Form form={form} onFinish={onFinish} initialValues={{ number: 0, status: true }} labelCol={formLayout.labelCol}>
                <Form.Item label='部门名称' name='name' rules={[{ required: true, message: '部门名称不能为空' }]}>
                    <Input allowClear></Input>
                </Form.Item>
                <Form.Item label='部门人数' name="number" rules={[{ required: true, message: '部门人数不能为空' }]} >
                    <InputNumber min={0} step={1} allowClear></InputNumber>
                </Form.Item>
                <Form.Item label='状态' name="status" >
                    <Radio.Group>
                        <Radio value={true}>启用</Radio>
                        <Radio value={false}>禁用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label='描述' name="content" rules={[{ required: true, message: '描述不能为空' }]} >
                    <TextArea allowClear rows={4}></TextArea>
                </Form.Item>
                <Form.Item>
                    <div className="add-btns">
                        <Space>
                            <Button loading={submitLoading} type='primary' htmlType='submit'>确认添加</Button>
                            <Button onClick={resetForm}>取消</Button>
                        </Space>
                    </div>
                </Form.Item>
            </Form>
        </Drawer>
    )
}
