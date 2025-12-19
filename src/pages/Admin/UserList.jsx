import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Input, Avatar, Space, Dropdown, message } from 'antd';
import {
    SearchOutlined,
    UserOutlined,
    MoreOutlined,
    SafetyCertificateOutlined,
    StopOutlined,
    CheckCircleOutlined,
    TeamOutlined,
    KeyOutlined
} from '@ant-design/icons';

const GlassPanel = ({ children, className = '' }) => (
    <div className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-xl ${className}`}>
        {children}
    </div>
);

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://serversense-server.onrender.com/api/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                message.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    const handleMenuClick = (e, record) => {
        if (e.key === 'deactivate') {
            message.success(`Deactivated user ${record.username}`);
        } else if (e.key === 'promote') {
            message.success(`Promoted ${record.username} to Admin`);
        }
    };

    const columns = [
        {
            title: 'User',
            dataIndex: 'username',
            key: 'username',
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <Avatar
                        icon={<UserOutlined />}
                        className={`bg-gradient-to-br ${record.role === 'admin' ? 'from-sky-500 to-blue-600' : 'from-purple-500 to-pink-500'}`}
                    />
                    <div>
                        <div className="font-semibold text-gray-200">{text}</div>
                        <div className="text-xs text-gray-500">{record.email}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag
                    icon={role === 'admin' ? <SafetyCertificateOutlined /> : <UserOutlined />}
                    className={`
                        border-none px-2 py-1 rounded-md flex w-fit items-center gap-1
                        ${role === 'admin'
                            ? 'bg-sky-500/10 text-sky-400'
                            : 'bg-purple-500/10 text-purple-400'}
                    `}
                >
                    {role ? role.toUpperCase() : 'USER'}
                </Tag>
            ),
        },
        {
            title: 'Password (Hashed)',
            dataIndex: 'password',
            key: 'password',
            render: (text) => (
                <div className="flex items-center gap-2 text-gray-500 text-xs font-mono truncate max-w-[150px]" title={text}>
                    <KeyOutlined />
                    {text ? `${text.substring(0, 10)}...` : 'Hidden'}
                </div>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            render: () => (
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_emerald]" />
                    <span className="text-gray-300">Active</span>
                </div>
            ),
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: [
                            { key: 'edit', label: 'Edit Profile' },
                            { key: 'promote', label: 'Change Role' },
                            { type: 'divider' },
                            { key: 'deactivate', label: 'Deactivate', danger: true, icon: <StopOutlined /> }
                        ],
                        onClick: (e) => handleMenuClick(e, record)
                    }}
                    trigger={['click']}
                >
                    <Button type="text" icon={<MoreOutlined />} className="text-gray-400 hover:text-white" />
                </Dropdown>
            ),
        },
    ];

    const filteredUsers = users.filter(user =>
        (user.username && user.username.toLowerCase().includes(searchText.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchText.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                        <span className="text-secondary">|</span> User Oversight
                    </h2>
                    <p className="text-sm text-gray-500">Manage access and user roles.</p>
                </div>
                <div className="flex gap-3">
                    <Input
                        placeholder="Search users..."
                        prefix={<SearchOutlined className="text-gray-500" />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full sm:w-64 border-white/10 bg-[#0a0a0a] text-gray-200 placeholder:text-gray-600 hover:border-white/20 focus:border-secondary/50"
                    />
                    <Button
                        type="primary"
                        icon={<TeamOutlined />}
                        className="bg-secondary border-none hover:bg-secondary/80 shadow-[0_0_15px_rgba(217,70,239,0.3)]"
                    >
                        Invite User
                    </Button>
                </div>
            </div>

            {/* Table */}
            <GlassPanel>
                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="_id"
                    loading={loading}
                    pagination={{ pageSize: 8 }}
                    className="custom-table"
                />
            </GlassPanel>
        </div>
    );
};

export default UserList;
