import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Progress, Button, message } from 'antd';
import {
    ThunderboltOutlined,
    WarningOutlined,
    DesktopOutlined,
    DashboardOutlined,
    RiseOutlined,
    ClockCircleOutlined,
    AreaChartOutlined,
    PieChartOutlined,
    CloudSyncOutlined,
    GatewayOutlined,
    DatabaseOutlined,
    ApiOutlined,
    SafetyCertificateOutlined,
    NodeIndexOutlined,
    ArrowRightOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// --- Styles & Components ---
const GlassPanel = ({ children, className = '' }) => (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl ${className}`}>
        {children}
    </div>
);

// --- TAB 1: OVERVIEW ---
const OverviewTab = ({ data, stats }) => {
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
                                percent={stats.healthScore}
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
                            { title: 'Total API Req', value: stats.apiReq, icon: <ThunderboltOutlined />, color: '#0ea5e9' },
                            { title: 'Active Sessions', value: stats.activeSessions, icon: <DesktopOutlined />, color: '#d946ef' },
                            { title: 'Avg. Latency', value: stats.latency, icon: <ClockCircleOutlined />, color: '#f59e0b' },
                            { title: 'Error Rate', value: stats.errorRate, icon: <WarningOutlined />, color: '#ef4444' }
                        ].map((stat, i) => (
                            <Col xs={12} key={i}>
                                <GlassPanel className="p-6 flex items-start justify-between hover:bg-white/5 transition-colors group h-full">
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-white transition-all duration-300">{stat.value}</p>
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
const PerformanceTab = ({ data }) => {
    const [range, setRange] = useState('1H');
    const [loading, setLoading] = useState(false);

    const handleRangeChange = (r) => {
        setLoading(true);
        setRange(r);
        // Simulate data fetch
        setTimeout(() => {
            setLoading(false);
            message.success(`Time range updated to ${r}`);
        }, 500);
    };

    return (
        <div className="space-y-6">
            <GlassPanel className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Performance Analytics</h3>
                        <p className="text-gray-500 text-xs">Deep dive into system metrics</p>
                    </div>
                    <div className="flex bg-white/5 rounded-lg p-1 gap-1">
                        {['1H', '6H', '24H', '7D'].map((r) => (
                            <button
                                key={r}
                                onClick={() => handleRangeChange(r)}
                                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${range === r ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={`h-[400px] transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
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
};

// --- TAB 3: CAPACITY PLANNING ---
const CapacitySnapshot = ({ data, onSimulate, isSimulating, riskResolved }) => (
    <GlassPanel className="p-6 h-full">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <PieChartOutlined className="text-purple-500" />
                Capacity Planning
            </h3>
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded">AI Risk Analysis</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className={`rounded-2xl p-6 border transition-all duration-500 ${riskResolved ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p className={`text-xs uppercase font-bold tracking-wider mb-1 ${riskResolved ? 'text-emerald-400' : 'text-red-400'}`}>
                            {riskResolved ? 'Status: Healthy' : 'Critical Warning'}
                        </p>
                        <h4 className="text-white text-xl font-medium">
                            {riskResolved ? 'Capacity Optimized' : 'Storage Exhaustion Imminent'}
                        </h4>
                    </div>
                    {!riskResolved && <WarningOutlined className="text-2xl text-red-500 animate-pulse" />}
                    {riskResolved && <SafetyCertificateOutlined className="text-2xl text-emerald-500" />}
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Predicted Usage (14 Days)</span>
                            <span className="text-white">{riskResolved ? '65%' : '98%'}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-1000 ${riskResolved ? 'bg-emerald-500 w-[65%]' : 'bg-red-500 w-[98%]'}`}
                            />
                        </div>
                    </div>
                </div>

                {!riskResolved && (
                    <div className="mt-6 bg-[#000]/40 rounded-xl p-4 border border-white/5">
                        <p className="text-gray-300 text-sm mb-3">
                            <strong className="text-white">Recommendation:</strong> Add 200GB to volume <code className="bg-white/10 px-1 rounded text-xs">vol-0a3</code>
                        </p>
                        <Button
                            type="primary"
                            danger
                            loading={isSimulating}
                            onClick={onSimulate}
                            icon={<CloudSyncOutlined />}
                            className="bg-red-600 border-none w-full"
                        >
                            Simulate Auto-Scaling
                        </Button>
                    </div>
                )}
                {riskResolved && (
                    <div className="mt-6 flex items-center gap-3 text-emerald-400 text-sm bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/10">
                        <CheckCircleOutlined /> Recommendation applied. Risk mitigated.
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <h4 className="text-gray-400 text-sm font-medium uppercase tracking-widest pl-1">Resource Trends</h4>
                <div className="space-y-3">
                    <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500"><DesktopOutlined /></div>
                            <div>
                                <p className="text-white font-medium">CPU Load</p>
                                <p className="text-xs text-gray-500">Global Average</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-white font-mono">{data.cpuTrend}%</p>
                            <span className="text-[10px] text-amber-400 flex items-center justify-end gap-1"><RiseOutlined /> +2.4%</span>
                        </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500"><DatabaseOutlined /></div>
                            <div>
                                <p className="text-white font-medium">Memory</p>
                                <p className="text-xs text-gray-500">Utilization</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-white font-mono">{data.memTrend}%</p>
                            <span className="text-[10px] text-emerald-400 flex items-center justify-end gap-1"><ArrowRightOutlined /> Stable</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </GlassPanel>
);

// --- TAB 4: SERVICE MAP (SVG) ---
const ServiceMap = ({ stats }) => {
    // Determine dynamic colors based on latency stats
    const apiHealth = parseInt(stats.latency) > 50 ? '#f59e0b' : '#10b981';
    // const dbHealth = '#10b981'; // Unused

    return (
        <GlassPanel className="p-0 h-[600px] relative overflow-hidden bg-[#050505]">
            {/* Header Overlay */}
            <div className="absolute top-6 left-6 z-10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <NodeIndexOutlined className="text-emerald-500" /> Service Map
                </h3>
                <p className="text-gray-500 text-xs mt-1">Live architecture topology & health</p>
            </div>

            {/* SVG Layer for Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#334155" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#334155" stopOpacity="0.2" />
                    </linearGradient>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#334155" />
                    </marker>
                </defs>

                {/* Connection: Client -> API GW */}
                <path d="M 200 300 C 300 300, 300 300, 400 300" fill="none" stroke="#334155" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <circle r="3" fill="#10b981">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M 200 300 C 300 300, 300 300, 400 300" />
                </circle>

                {/* Connection: API GW -> Auth */}
                <path d="M 480 300 C 550 300, 550 150, 650 150" fill="none" stroke="#334155" strokeWidth="2" />
                <circle r="3" fill="#10b981">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M 480 300 C 550 300, 550 150, 650 150" />
                </circle>

                {/* Connection: API GW -> DB */}
                <path d="M 480 300 C 550 300, 550 450, 650 450" fill="none" stroke="#334155" strokeWidth="2" />
                <circle r="3" fill="#3b82f6">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 480 300 C 550 300, 550 450, 650 450" />
                </circle>

                {/* Connection: DB -> Cache */}
                <path d="M 750 450 C 800 450, 800 450, 850 450" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
            </svg>

            {/* Nodes Layer (Absolute Positioning) */}
            <div className="absolute inset-0 w-full h-full">

                {/* 1. Client Node */}
                <div className="absolute left-[120px] top-[260px] w-20 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-[#111] border border-gray-700 shadow-[0_0_20px_rgba(255,255,255,0.05)] flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
                        <DesktopOutlined className="text-2xl text-gray-400" />
                    </div>
                    <div className="text-center">
                        <p className="text-gray-300 text-xs font-bold">Client</p>
                        <p className="text-gray-600 text-[10px]">Web / Mobile</p>
                    </div>
                </div>

                {/* 2. API Gateway Node */}
                <div className="absolute left-[400px] top-[250px] w-24 flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-xl bg-[#0f172a] border-2 shadow-[0_0_30px_rgba(16,185,129,0.2)] flex flex-col items-center justify-center z-10 relative hover:scale-110 transition-transform cursor-pointer" style={{ borderColor: apiHealth }}>
                        <GatewayOutlined className="text-3xl mb-1" style={{ color: apiHealth }} />
                        <span className="text-[10px] font-bold text-white">API GW</span>
                        {/* Status Dot */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: apiHealth }} />
                    </div>
                    <div className="bg-white/5 px-2 py-1 rounded text-[10px] text-gray-400 font-mono">
                        {stats.latency}
                    </div>
                </div>

                {/* 3. Auth Service Node */}
                <div className="absolute left-[650px] top-[110px] w-24 flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-xl bg-[#0f172a] border border-gray-700 hover:border-emerald-500 transition-colors flex flex-col items-center justify-center z-10 hover:scale-110">
                        <SafetyCertificateOutlined className="text-2xl text-emerald-400 mb-1" />
                        <span className="text-[10px] text-gray-300">Auth</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-[9px] bg-green-900/30 text-green-400 px-1.5 py-0.5 rounded">Healthy</span>
                    </div>
                </div>

                {/* 4. Database Node */}
                <div className="absolute left-[650px] top-[410px] w-24 flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-xl bg-[#0f172a] border border-gray-700 hover:border-blue-500 transition-colors flex flex-col items-center justify-center z-10 hover:scale-110">
                        <DatabaseOutlined className="text-2xl text-blue-400 mb-1" />
                        <span className="text-[10px] text-gray-300">Primary DB</span>
                    </div>
                    <div className="bg-white/5 px-2 py-1 rounded text-[10px] text-gray-400 font-mono">
                        {stats.activeSessions} Conn
                    </div>
                </div>

                {/* 5. Cache Node */}
                <div className="absolute left-[850px] top-[425px] w-16 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-lg bg-[#0f172a] border border-dashed border-gray-600 flex flex-col items-center justify-center z-10 opacity-80">
                        <CloudSyncOutlined className="text-lg text-amber-500" />
                    </div>
                    <span className="text-[10px] text-gray-500">Redis</span>
                </div>

            </div>
        </GlassPanel>
    );
};

// --- DATA GENERATION ---
const generateData = (count = 20) => {
    return Array.from({ length: count }, (_, i) => ({
        time: new Date(Date.now() - (count - i) * 2000).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        cpu: Math.floor(Math.random() * 30) + 20,
        memory: Math.floor(Math.random() * 20) + 40,
        disk: Math.floor(Math.random() * 10) + 60,
        net: Math.floor(Math.random() * 200) + 100,
    }));
};

// --- MAIN DASHBOARD COMPONENT ---
const DashboardHome = () => {
    const [data, setData] = useState(generateData(20));
    const [stats, setStats] = useState({
        healthScore: 98,
        apiReq: '2.4M',
        activeSessions: '843',
        latency: '24ms',
        errorRate: '0.01%'
    });

    // Insights State
    const [capacityData, setCapacityData] = useState({ cpuTrend: 5, memTrend: 65 });
    const [isSimulating, setIsSimulating] = useState(false);
    const [riskResolved, setRiskResolved] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            // Update Chart Data
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

            // Update Stats
            setStats(prev => ({
                healthScore: Math.min(100, Math.max(90, prev.healthScore + (Math.random() > 0.5 ? 1 : -1))),
                apiReq: (parseFloat(prev.apiReq) + Math.random() * 0.01).toFixed(2) + 'M',
                activeSessions: Math.floor(parseInt(prev.activeSessions) + (Math.random() - 0.5) * 10).toString(),
                latency: Math.floor(20 + Math.random() * 40) + 'ms', // Fluctuate more for visual effect in map
                errorRate: (0.01 + Math.random() * 0.02).toFixed(3) + '%'
            }));

            // Update Capacity Randomly
            setCapacityData(prev => ({
                cpuTrend: Math.max(2, Math.min(15, prev.cpuTrend + (Math.random() - 0.5))),
                memTrend: Math.max(40, Math.min(80, prev.memTrend + (Math.random() - 0.5) * 2))
            }));

        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleSimulateScale = () => {
        setIsSimulating(true);
        setTimeout(() => {
            setRiskResolved(true);
            setIsSimulating(false);
            message.success('Auto-scaling configuration applied successfully!');
        }, 2000); // 2-second simulation
    };

    const tabItems = [
        {
            key: '1',
            label: <span className="flex items-center gap-2 px-2 py-1"><DashboardOutlined /> Overview</span>,
            children: <OverviewTab data={data} stats={stats} />
        },
        {
            key: '2',
            label: <span className="flex items-center gap-2 px-2 py-1"><RiseOutlined /> Performance</span>,
            children: <PerformanceTab data={data} />
        },
        {
            key: '3',
            label: <span className="flex items-center gap-2 px-2 py-1"><PieChartOutlined /> Capacity</span>,
            children: <CapacitySnapshot
                data={capacityData}
                onSimulate={handleSimulateScale}
                isSimulating={isSimulating}
                riskResolved={riskResolved}
            />
        },
        {
            key: '4',
            label: <span className="flex items-center gap-2 px-2 py-1"><NodeIndexOutlined /> Service Map</span>,
            children: <ServiceMap stats={stats} />
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
