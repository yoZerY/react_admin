import React, { useState } from 'react'
import { Table } from 'antd'
export default function TableComponent({ columns, dataSource }) {
    const [tableLoading, setTableLoading] = useState(false)
    const [tableData, setTableData] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [selectedArr, setSelectedArr] = useState([])
    const [rowData, setRowData] = useState({})

    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelectedArr(selectedRowKeys)
        }
    }
    return (
        <Table
            rowKey='id'
            columns={columns}
            dataSource={dataSource}
            size="middle"
            bordered
            loading={tableLoading}
            rowSelection={{ ...rowSelection, columnWidth: '60px' }}
        >

        </Table>
    )
}
