import React, { useState } from 'react';
import { Divider, Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import './customLayout.less';
import { sidebarItems } from './sidearConstant';
import Title from 'antd/lib/skeleton/Title';
import { FooterText } from '../util/constant';

const { Header, Content, Footer, Sider } = Layout;


const CustomLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout className="custom-layout-container">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <Divider />
                <Title level={2} className="main-sidebar-heading">
                    Blog
                </Title>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={sidebarItems}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" />
                <Content className="custom-main-content">
                    <div className="site-layout-background  custom-inner-content">
                        <Outlet />
                    </div>
                </Content>
                <Footer className="custom-main-layout-footer">
                    {FooterText}
                </Footer>
            </Layout>
        </Layout>
    );
};
export default CustomLayout;