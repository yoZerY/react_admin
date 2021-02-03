import React, { useState, useImperativeHandle } from 'react'
import { reqDepartmentEdit, reqDepartmentDetails } from '../../api/department'
import { Drawer, Button, Space, Form, Input, Radio, InputNumber, message } from 'antd'
const { TextArea } = Input;
const formLayout = {
    labelCol: { span: 3 }
}

export default function AddDepartmentModel({ editModalRef, queryTableData }) {
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [formData, setFormData] = useState({})
    const [rowData, setRowData] = useState({})

    useImperativeHandle(editModalRef, () => ({
        changeVisible: (data) => {
            setRowData(data)
            setVisible(true)
            reqDepartmentDetails({ id: data.id }).then(res => {
                const data = res.data.data
                form.setFieldsValue({ ...data })
                setFormData(data)
            })
        }
    }))
    const onFinish = (value) => {
        if (!rowData.id) return false
        setSubmitLoading(true)
        value.id = rowData.id
        reqDepartmentEdit(value).then(res => {
            message.success(res.data.message)
            form.resetFields()
            setVisible(false)
            queryTableData()
            setSubmitLoading(false)
        })
    }
    const resetForm = () => {
        form.setFieldsValue({ ...formData })
    }
    const closeDrawer = () => {
        form.resetFields()
        setVisible(false)
    }
    return (
        <Drawer onClose={closeDrawer} title="部门编辑" visible={visible} width='50%'>
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
                            <Button loading={submitLoading} type='primary' htmlType='submit'>修改</Button>
                            <Button onClick={resetForm}>取消</Button>
                        </Space>
                    </div>
                </Form.Item>
            </Form>
        </Drawer>
    )
}
