import React from 'react';
import { Tag } from 'antd';
import {
    WarningOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

const UserAlerts = () => {
    // Mock Alerts Data (Read Only)
    const alerts = [
        { id: 1, type: 'critical', message: 'High CPU Load on Node-4 > 90%', source: 'Node-4', time: '2m ago' },
        { id: 2, type: 'warning', message: 'Memory usage approaching limit', source: 'Redis-Cache', time: '15m ago' },
        { id: 6, type: 'warning', message: 'High Disk I/O detected', source: 'Worker-01', time: '4h ago' },
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'critical': return <CloseCircleOutlined className="text-red-500" />;
            case 'warning': return <WarningOutlined className="text-amber-500" />;
            default: return <InfoCircleOutlined className="text-gray-500" />;
        }
    };

    return (
        <div className="space-y-6 text-gray-200">
            {/* Header */}
            <div className="flex flex-col gap-1 px-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    System Alerts
                </h1>
                <p className="text-sm text-gray-500">Active incidents and warnings (View Only).</p>
            </div>

            {/* Alerts List */}
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 border-b border-white/5 bg-white/5 text-sm font-semibold text-gray-400">
                    <div className="w-8 text-center">Type</div>
                    <div>Message</div>
                    <div className="text-right">Time</div>
                </div>

                <div className="divide-y divide-white/5">
                    {alerts.map((alert) => (
                        <div key={alert.id} className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 items-center hover:bg-white/5 transition-colors">
                            <div className="w-8 flex justify-center text-lg">
                                {getIcon(alert.type)}
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-200">{alert.message}</span>
                                    <Tag className="bg-white/5 border-white/10 text-gray-500 text-[10px] uppercase">{alert.source}</Tag>
                                </div>
                            </div>

                            <div className="text-sm text-gray-500 text-right whitespace-nowrap">
                                {alert.time}
                            </div>
                        </div>
                    ))}
                    {alerts.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            <CheckCircleOutlined className="text-2xl mb-2 text-emerald-500/50" />
                            <p>No active alerts</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserAlerts;
