import React, { Fragment } from 'react'
import { Avatar, Menu, Dropdown } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'

export default function HeaderModel() {
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
    return (
        <Fragment>
            <MenuFoldOutlined className="menu-fold-outlined" />
            <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Avatar className='user-avatar' size='large'>yoZer</Avatar>
            </Dropdown>

        </Fragment>
    )
}
