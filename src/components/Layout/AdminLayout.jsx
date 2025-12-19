import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import {
    DashboardOutlined,
    CloudServerOutlined,
    AlertOutlined,
    SettingOutlined,
    UserOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BellOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const navigate = useNavigate();

    const menuItems = [
        {
            key: '/admin',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: '/admin/servers',
            icon: <CloudServerOutlined />,
            label: 'Servers',
        },
        {
            key: '/admin/alerts',
            icon: <AlertOutlined />,
            label: 'Alerts',
        },
        {
            key: '/admin/users',
            icon: <UserOutlined />,
            label: 'Users',
        },
        {
            key: '/admin/settings',
            icon: <SettingOutlined />,
            label: 'Settings',
        },
    ];

    const handleMenuClick = ({ key }) => {
        if (key === 'logout') {
            // Mock logout
            localStorage.removeItem('token');
            window.location.href = '/login';
        } else if (key) {
            navigate(key);
        }
    };

    // ...

    return (
        <Layout className="min-h-screen font-sans">
            <Sider
            // ... props
            >
                {/* ... logo */}

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick} // Add click handler
                    className="bg-transparent border-r-0 mt-4 px-2"
                    style={{ background: 'transparent' }}
                />
            </Sider>
            <Layout className="bg-background">
                <Header className="bg-background/80 backdrop-blur-md border-b border-gray-800 px-6 flex justify-between items-center h-16 sticky top-0 z-20">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-white hover:text-primary text-lg w-10 h-10"
                    />

                    <div className="flex items-center gap-6">
                        <Link to="/admin/alerts">
                            <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer relative">
                                <BellOutlined className="text-xl text-gray-400 hover:text-white transition-colors" />
                            </motion.div>
                        </Link>

                        <Dropdown menu={userMenu} placement="bottomRight" arrow>
                            <div className="flex items-center gap-3 cursor-pointer hover:bg-white/5 px-2 py-1 rounded-lg transition-colors">
                                <Avatar icon={<UserOutlined />} className="bg-primary/20 text-primary border border-primary/40" />
                                <span className="text-sm font-medium text-gray-300 hidden md:inline">Admin User</span>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Content className="p-6 overflow-y-auto bg-background">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
