import React, { Component } from 'react'
import './index.scss'
import { Layout } from 'antd';
import HeaderModel from './header.js'
import Asider from './asider.js'
import Main from './main.js'

const { Header, Sider, Content } = Layout;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: JSON.parse(localStorage.getItem('collapsed')) || false
        }
    }
    changeCollapsed = () => {
        const collapsed = !this.state.collapsed
        this.setState({
            collapsed
        })
        localStorage.setItem('collapsed', collapsed)
    }
    render() {
        const { collapsed } = this.state
        return (
            <Layout className="layout-wrap">
                <Sider collapsed={collapsed} className="sider-wrap" width="200">
                    <Asider collapsed={collapsed} />
                </Sider>
                <Layout>
                    <Header className="header-wrap">
                        <HeaderModel changeCollapsed={this.changeCollapsed} collapsed={collapsed} />
                    </Header>
                    <Content className="content-wrap">
                        <Main />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index
