import React, { useRef, useState, useEffect } from 'react'
import './index.scss'
import { reqDepartmentList, reqDelDepartment, reqDepartmentStatus } from '@/api/department'
import { Button, Form, Input, Table, Switch, Space, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddDepartmentModal from './addModal.js'
import EditDepartmentModal from './editModal.js'

export default function DepartmentList() {
    const addModalRef = useRef()
    const editModalRef = useRef()
    const [tableLoading, setTableLoading] = useState(false)
    const [tableData, setTableData] = useState([])
    const [username, setusername] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [selectedArr, setSelectedArr] = useState([])
    const [rowData, setRowData] = useState({})
    const [count, setCount] = useState(0)
    const columns = [
        { title: '部门名称', dataIndex: 'name', key: 'name' },
        {
            title: '禁启用',
            dataIndex: 'status',
            key: 'status',
            render: (text, rowData) => {
                return <Switch onChange={() => changeStatus(rowData)} checkedChildren='启用' unCheckedChildren='禁用' defaultChecked={rowData.status}></Switch>
            }
        },
        { title: '部门人数', dataIndex: 'number', key: 'number' },
        {
            title: '操作', dataIndex: '', key: '',
            width: 200,
            render: (text, rowData) => {
                return (
                    <Space>
                        <Button onClick={() => editRowData(rowData)}>编辑</Button>
                        <Button onClick={() => delRowData(rowData)} type='danger'>删除</Button>
                    </Space>
                )
            }
        }
    ]
    useEffect(() => {
        queryTableData()
        // eslint-disable-next-line
    }, [])
    const changeStatus = (rowData) => {
        const data = {
            id: rowData.id,
            status: !rowData.status
        }
        reqDepartmentStatus(data).then(res => {
            message.success(res.data.message)
            queryTableData()
        })
    }
    const editRowData = (data) => {
        setRowData(data)
        editModalRef.current.changeVisible(data)
    }
    const queryTableData = () => {
        setTableLoading(true)
        const data = {
            name: username,
            pageNumber: pageNumber,
            pageSize: pageSize
        }
        reqDepartmentList(data).then(res => {
            setCount(res.data.data.total)
            setTableData(res.data.data.data)
            setTableLoading(false)
        })
    }
    const onFinish = ({ username }) => {
        setusername(username)
        queryTableData()
    }
    const delRowData = (rowData) => {
        Modal.confirm({
            title: '确认删除此条数据?',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk: () => confirmDel(rowData.id)
        });
    }
    const confirmDel = (id) => {
        reqDelDepartment({ id }).then(res => {
            message.success(res.data.message)
            queryTableData(username, pageNumber, pageSize)
        })
    }
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelectedArr(selectedRowKeys)
        }
    }
    const delSelectedData = () => {
        if (selectedArr.length === 0) {
            return message.warning('请选择数据')
        }
        Modal.confirm({
            title: '确认删除选择数据?',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                const data = {
                    id: selectedArr.join()
                }
                reqDelDepartment(data).then(res => {
                    message.success(res.data.message)
                    queryTableData()
                    setSelectedArr([])
                })
            },
            onCancel: () => {
                setSelectedArr([])
            }
        });
    }
    const addDepartment = () => {
        addModalRef.current.changeVisible()
    }
    const changePageSize = (current, pageSize) => {
        console.log('pageSize', pageSize)
        setPageSize(pageSize)
        setPageNumber(1)
        queryTableData()
    }
    const changePage = (current) => {
        console.log('current', current)
        setPageNumber(current)
        queryTableData()
    }
    return (
        <div>
            <div>
                <Form initialValues={{ username: '' }} onFinish={onFinish} layout='inline'>
                    <Form.Item label="部门名称" name='username'>
                        <Input placeholder='请输入部门名称...' allowClear></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit'>查找</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type='danger' onClick={delSelectedData}>批量删除</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' onClick={addDepartment}>添加部门</Button>
                    </Form.Item>
                </Form>
                <div className='department-table'>
                    <Table
                        size="middle"
                        loading={tableLoading}
                        rowKey='id'
                        bordered
                        columns={columns}
                        dataSource={tableData}
                        rowSelection={{ ...rowSelection, columnWidth: '60px' }}
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSize: pageSize,
                            current: pageNumber,
                            total: count,
                            showTotal: () => `共${count}条`,
                            onShowSizeChange: (current, pageSize) => changePageSize(current, pageSize),
                            onChange: (current) => changePage(current)
                        }}
                    ></Table>
                </div>
            </div>
            <AddDepartmentModal
                queryTableData={queryTableData}
                addModalRef={addModalRef}>
            </AddDepartmentModal>
            <EditDepartmentModal
                rowData={rowData}
                queryTableData={queryTableData}
                editModalRef={editModalRef}>
            </EditDepartmentModal>
        </div>
    )
}
