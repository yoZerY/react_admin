import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import Routers from '../../router/index'
const { SubMenu } = Menu;
const AsideMenu = ({ history, location, match }) => {
    const [openMenuKeys, setOpenMenuKeys] = useState([])
    const [selectedMenuKeys, setSelectedMenuKeys] = useState([])
    useEffect(() => {
        const { pathname } = location
        const openKeys = pathname.split('/').slice(0, 3).join('/')
        setSelectedMenuKeys([pathname])
        setOpenMenuKeys([openKeys])
    }, [location])
    const menuClickEvent = ({ item, key, keyPath, domEvent }) => {
        setOpenMenuKeys([keyPath[keyPath.length - 1]])
        setSelectedMenuKeys([key])
    }
    const menuOpenChangeEvent = (e) => {
        const path = e[e.length - 1]
        Routers && Routers.forEach(menu => {
            if (menu.key === path) {
                if (menu.child) {
                    setSelectedMenuKeys([menu.child[0].key])
                    history.push(menu.child[0].key)
                }
            }
        })
        setOpenMenuKeys([path])
    }
    const renderChildMenu = ({ key, title, child }) => {
        return (
            <SubMenu key={key} title={title}>
                {
                    child && child.map(subMenu => {
                        return subMenu.child && subMenu.child.length > 0 ? renderChildMenu(subMenu) : renderMenu(subMenu)
                    })
                }
            </SubMenu>
        )
    }
    const renderMenu = ({ key, title }) => {
        return <Menu.Item key={key}>
            <Link to={key}>{title}</Link>
        </Menu.Item>
    }
    return (
        <Menu
            theme="dark"
            mode="inline"
            openKeys={openMenuKeys}
            selectedKeys={selectedMenuKeys}
            onClick={menuClickEvent}
            onOpenChange={menuOpenChangeEvent}
        >
            {
                Routers && Routers.map(menu => {
                    return menu.child && menu.child.length > 0 ? renderChildMenu(menu) : renderMenu(menu)
                })
            }
        </Menu>
    )
}

export default withRouter(AsideMenu)
