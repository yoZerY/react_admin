import React from 'react'
import './index.scss'
import { Button } from 'antd'
import AddDepartmentModal from './addModel'
export default function DepartmentList() {
    const addDepartment = () => {

    }
    return (
        <div>
            <Button onClick={addDepartment}>添加部门</Button>
            <AddDepartmentModal></AddDepartmentModal>
        </div>
    )
}
