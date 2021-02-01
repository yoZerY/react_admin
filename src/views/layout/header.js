import React, { Fragment } from 'react'
import { Avatar, Menu, Dropdown } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

export default function HeaderModel({ changeCollapsed, collapsed }) {
    const menu = (
        <Menu>
            <Menu.Item>
                个人中心
            </Menu.Item>
            <Menu.Item>
                退出
            </Menu.Item>
        </Menu>
    )
    const handleCollapsed = () => {
        changeCollapsed()
    }
    return (
        <Fragment>
            {
                collapsed ?
                    <MenuUnfoldOutlined onClick={handleCollapsed} className="outlined" />
                    : <MenuFoldOutlined onClick={handleCollapsed} className="outlined" />
            }
            <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Avatar className='user-avatar' size='large'>yoZer</Avatar>
            </Dropdown>
        </Fragment>
    )
}
