import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Badge, Progress, Button, Select } from 'antd';
import {
    CloudServerOutlined,
    HddOutlined,
    ThunderboltOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    DesktopOutlined,
    SafetyCertificateOutlined,
    NodeIndexOutlined,
    FireOutlined,
    DashboardOutlined,
    RiseOutlined,
    FallOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';

// --- Data Generation ---
const generateData = (count = 20) => {
    return Array.from({ length: count }, (_, i) => ({
        time: new Date(Date.now() - (count - i) * 2000).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        cpu: Math.floor(Math.random() * 30) + 20,
        memory: Math.floor(Math.random() * 20) + 40,
        disk: Math.floor(Math.random() * 10) + 60,
        net: Math.floor(Math.random() * 200) + 100,
    }));
};

const mockNodes = Array.from({ length: 12 }, (_, i) => ({
    id: `node-${i + 1}`,
    status: Math.random() > 0.9 ? 'error' : (Math.random() > 0.8 ? 'warning' : 'ok'),
    load: Math.floor(Math.random() * 80) + 10
}));

// --- Styles & Components ---
const GlassPanel = ({ children, className = '' }) => (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl ${className}`}>
        {children}
    </div>
);

// --- TAB 1: OVERVIEW ---
const OverviewTab = ({ data, curr }) => {
    return (
        <div className="space-y-6">
            <Row gutter={[20, 20]}>
                {/* Health Ring & Stability */}
                <Col xs={24} lg={8}>
                    <GlassPanel className="h-full p-6 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-purple-500 opacity-50" />
                        <h3 className="text-gray-400 uppercase tracking-widest text-xs font-semibold mb-6">System Health Score</h3>
                        <div className="relative flex items-center justify-center group">
                            {/* Animated Pulse Ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping opacity-20" />
                            <Progress
                                type="dashboard"
                                percent={98}
                                strokeColor={{ '0%': '#10b981', '100%': '#3b82f6' }}
                                trailColor="rgba(255,255,255,0.05)"
                                width={180}
                                format={percent => (
                                    <div className="flex flex-col items-center mt-2">
                                        <span className="text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">{percent}</span>
                                        <span className="text-xs text-emerald-400 mt-1 uppercase tracking-wide">Excellent</span>
                                    </div>
                                )}
                            />
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-8 w-full">
                            <div className="text-center">
                                <p className="text-gray-500 text-xs uppercase">Uptime</p>
                                <p className="text-xl font-mono text-white">14d 21h</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500 text-xs uppercase">Incidents</p>
                                <p className="text-xl font-mono text-white">0</p>
                            </div>
                        </div>
                    </GlassPanel>
                </Col>

                {/* Quick Stats Grid */}
                <Col xs={24} lg={16}>
                    <Row gutter={[20, 20]}>
                        {[
                            { title: 'Total API Req', value: '2.4M', icon: <ThunderboltOutlined />, color: '#0ea5e9' },
                            { title: 'Active Sessions', value: '843', icon: <DesktopOutlined />, color: '#d946ef' },
                            { title: 'Avg. Latency', value: '24ms', icon: <ClockCircleOutlined />, color: '#f59e0b' },
                            { title: 'Error Rate', value: '0.01%', icon: <WarningOutlined />, color: '#ef4444' }
                        ].map((stat, i) => (
                            <Col xs={12} key={i}>
                                <GlassPanel className="p-6 flex items-start justify-between hover:bg-white/5 transition-colors group h-full">
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                                    </div>
                                    <div
                                        className="p-3 rounded-xl bg-opacity-10 text-2xl group-hover:scale-110 transition-transform duration-300"
                                        style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                                    >
                                        {stat.icon}
                                    </div>
                                </GlassPanel>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            {/* Sparklines Row */}
            <GlassPanel className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <RiseOutlined className="text-secondary" />
                        Live Trends
                    </h3>
                </div>
                <Row gutter={40}>
                    <Col span={8}>
                        <div className="h-20">
                            <p className="text-xs text-gray-500 mb-1">CPU Trend</p>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.4} /><stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} /></linearGradient></defs>
                                    <Area type="monotone" dataKey="cpu" stroke="#0ea5e9" strokeWidth={2} fill="url(#g1)" isAnimationActive={false} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="h-20">
                            <p className="text-xs text-gray-500 mb-1">Memory Trend</p>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d946ef" stopOpacity={0.4} /><stop offset="100%" stopColor="#d946ef" stopOpacity={0} /></linearGradient></defs>
                                    <Area type="monotone" dataKey="memory" stroke="#d946ef" strokeWidth={2} fill="url(#g2)" isAnimationActive={false} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="h-20">
                            <p className="text-xs text-gray-500 mb-1">Network traffic</p>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs><linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
                                    <Area type="monotone" dataKey="net" stroke="#10b981" strokeWidth={2} fill="url(#g3)" isAnimationActive={false} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Col>
                </Row>
            </GlassPanel>
        </div>
    );
};

// --- TAB 2: PERFORMANCE ---
const PerformanceTab = ({ data }) => (
    <div className="space-y-6">
        <GlassPanel className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Performance Analytics</h3>
                    <p className="text-gray-500 text-xs">Deep dive into system metrics</p>
                </div>
                <div className="flex bg-white/5 rounded-lg p-1 gap-1">
                    {['1H', '6H', '24H', '7D'].map((range, i) => (
                        <button key={range} className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="perfCpu" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="perfMem" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="#ffffff08" />
                        <XAxis dataKey="time" stroke="#525252" tick={{ fill: '#737373', fontSize: 10 }} />
                        <YAxis stroke="#525252" tick={{ fill: '#737373', fontSize: 10 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                        <Area type="monotone" dataKey="cpu" stroke="#0ea5e9" strokeWidth={3} fill="url(#perfCpu)" name="CPU Load (%)" />
                        <Area type="monotone" dataKey="memory" stroke="#d946ef" strokeWidth={3} fill="url(#perfMem)" name="Memory (%)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassPanel>

        <Row gutter={20}>
            <Col span={12}>
                <GlassPanel className="p-6 h-[300px] flex flex-col">
                    <h4 className="text-white font-semibold mb-4 text-sm">Disk Usage Distribution</h4>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[{ name: '/root', val: 75 }, { name: '/home', val: 40 }, { name: '/var', val: 60 }, { name: '/tmp', val: 10 }]}>
                            <CartesianGrid vertical={false} stroke="#ffffff08" />
                            <XAxis dataKey="name" stroke="#525252" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                                {[{ name: '/root', val: 75 }, { name: '/home', val: 40 }, { name: '/var', val: 60 }, { name: '/tmp', val: 10 }].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0ea5e9' : '#8b5cf6'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </GlassPanel>
            </Col>
            <Col span={12}>
                <GlassPanel className="p-6 h-[300px]">
                    <h4 className="text-white font-semibold mb-6 text-sm">Resource Consumption Leaders</h4>
                    <div className="space-y-4">
                        {[
                            { name: 'Service-Worker-01', type: 'CPU', val: 92, color: 'bg-red-500' },
                            { name: 'Database-Primary', type: 'RAM', val: 86, color: 'bg-amber-500' },
                            { name: 'Analytics-Node', type: 'Disk', val: 74, color: 'bg-sky-500' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-300 text-sm font-medium">{item.name}</span>
                                        <span className="text-gray-500 text-xs">{item.type}</span>
                                    </div>
                                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                                        <div className={`h-1.5 rounded-full ${item.color}`} style={{ width: `${item.val}%` }} />
                                    </div>
                                </div>
                                <span className="text-white font-mono text-sm">{item.val}%</span>
                            </div>
                        ))}
                    </div>
                </GlassPanel>
            </Col>
        </Row>
    </div>
);

// --- TAB 3: ALERTS ---
const AlertsTab = () => (
    <div className="space-y-6">
        <Row gutter={20}>
            {[
                { label: 'Critical Errors', val: 2, color: '#ef4444', icon: <FireOutlined /> },
                { label: 'Warnings', val: 5, color: '#f59e0b', icon: <WarningOutlined /> },
                { label: 'Info Logs', val: 12, color: '#3b82f6', icon: <ClockCircleOutlined /> }
            ].map((stat, i) => (
                <Col span={8} key={i}>
                    <GlassPanel className="p-6 flex items-center gap-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
                        <div className="p-3 rounded-xl bg-opacity-20 text-3xl" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white mb-1 group-hover:scale-105 transition-transform">{stat.val}</p>
                            <p className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</p>
                        </div>
                    </GlassPanel>
                </Col>
            ))}
        </Row>

        <GlassPanel className="p-0">
            <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-lg font-bold text-white">Active Incidents</h3>
            </div>
            <div className="divide-y divide-white/5">
                {[
                    { msg: 'High CPU Load (>90%) on Node-04', type: 'Critical', time: '2m ago', server: 'Node-04' },
                    { msg: 'Redis Latency Spike detected', type: 'Warning', time: '14m ago', server: 'Cache-Cluster' },
                    { msg: 'Backup completed with warnings', type: 'Warning', time: '1h ago', server: 'Backup-Svc' },
                    { msg: 'New admin user created', type: 'Info', time: '2h ago', server: 'Auth-System' },
                ].map((alert, i) => (
                    <div key={i} className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${alert.type === 'Critical' ? 'bg-red-500 shadow-[0_0_8px_red]' : (alert.type === 'Warning' ? 'bg-amber-500' : 'bg-blue-500')}`} />
                            <div>
                                <p className="text-gray-200 font-medium group-hover:text-white transition-colors">{alert.msg}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">{alert.server}</span>
                                    <span className="text-xs text-gray-600">ID: #{2045 + i}</span>
                                </div>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500 font-mono">{alert.time}</span>
                    </div>
                ))}
            </div>
        </GlassPanel>
    </div>
);

// --- TAB 4: CLUSTER HEALTH ---
const ClusterHealthTab = () => (
    <div className="space-y-6">
        <GlassPanel className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Node Status Grid</h3>
                <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-2 text-gray-400"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_emerald]" /> Healthy</span>
                    <span className="flex items-center gap-2 text-gray-400"><span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_5px_amber]" /> Warning</span>
                    <span className="flex items-center gap-2 text-gray-400"><span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_red]" /> Critical</span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {mockNodes.map((node) => (
                    <div
                        key={node.id}
                        className={`
                            relative h-24 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer
                            ${node.status === 'ok' ? 'bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]' :
                                node.status === 'warning' ? 'bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]' :
                                    'bg-red-500/5 border-red-500/20 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]'}
                        `}
                    >
                        <NodeIndexOutlined className={`text-xl ${node.status === 'ok' ? 'text-emerald-500' : node.status === 'warning' ? 'text-amber-500' : 'text-red-500'}`} />
                        <span className="text-gray-300 font-medium text-xs uppercase">{node.id}</span>
                        <div className="absolute inset-x-2 bottom-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full ${node.status === 'ok' ? 'bg-emerald-500' : node.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${node.load}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </GlassPanel>

        <Row gutter={20}>
            <Col span={12}>
                <GlassPanel className="p-6 h-[250px] flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-sky-500/10 flex items-center justify-center text-3xl text-sky-500 mb-4">
                        99.99%
                    </div>
                    <h4 className="text-white font-bold text-lg">Cluster Availability</h4>
                    <p className="text-gray-500 text-sm mt-1">Last 30 Days</p>
                </GlassPanel>
            </Col>
            <Col span={12}>
                <GlassPanel className="p-6 h-[250px] flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center text-3xl text-purple-500 mb-4">
                        <CheckCircleOutlined />
                    </div>
                    <h4 className="text-white font-bold text-lg">Redundancy Status</h4>
                    <p className="text-gray-500 text-sm mt-1">N+2 Redundancy Active</p>
                </GlassPanel>
            </Col>
        </Row>
    </div>
);

// --- MAIN DASHBOARD COMPONENT ---
const DashboardHome = () => {
    const [data, setData] = useState(generateData(20));

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const last = prev[prev.length - 1];
                return [...prev.slice(1), {
                    time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    cpu: Math.max(10, Math.min(95, last.cpu + (Math.random() - 0.5) * 15)),
                    memory: Math.max(30, Math.min(90, last.memory + (Math.random() - 0.5) * 8)),
                    disk: Math.max(50, Math.min(95, last.disk + (Math.random() - 0.5) * 2)),
                    net: Math.max(50, Math.min(500, last.net + (Math.random() - 0.5) * 30)),
                }];
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const curr = data[data.length - 1];

    const tabItems = [
        {
            key: '1',
            label: <span className="flex items-center gap-2 px-2 py-1"><DashboardOutlined /> Overview</span>,
            children: <OverviewTab data={data} curr={curr} />
        },
        {
            key: '2',
            label: <span className="flex items-center gap-2 px-2 py-1"><RiseOutlined /> Performance</span>,
            children: <PerformanceTab data={data} />
        },
        {
            key: '3',
            label: <span className="flex items-center gap-2 px-2 py-1"><WarningOutlined /> Alerts</span>,
            children: <AlertsTab />
        },
        {
            key: '4',
            label: <span className="flex items-center gap-2 px-2 py-1"><NodeIndexOutlined /> Cluster Health</span>,
            children: <ClusterHealthTab />
        }
    ];

    return (
        <div className="min-h-screen text-gray-200 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-1 px-1 mb-6">
                <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-white">
                    System Dashboard
                    <div className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                    </div>
                </h1>
                <p className="text-sm text-gray-500">Real-time infrastructure monitoring</p>
            </div>

            {/* Configured Tabs */}
            <Tabs
                defaultActiveKey="1"
                items={tabItems}
                className="custom-tabs"
                tabBarStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
            />
        </div>
    );
};

export default DashboardHome;
