import { useState, useEffect } from 'react';
import { Filter, Download } from 'lucide-react';
import { Button } from '../../components/ui';

interface Log {
    id: string;
    userId: string;
    userName: string;
    action: string;
    details: string;
    timestamp: string;
    ipAddress: string;
}

export function ActivityLogs() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Mock data
        setLogs([
            {
                id: '1',
                userId: '1',
                userName: 'Admin User',
                action: 'LOGIN',
                details: 'Đăng nhập thành công',
                timestamp: new Date().toISOString(),
                ipAddress: '192.168.1.1',
            },
            {
                id: '2',
                userId: '2',
                userName: 'John Doe',
                action: 'CREATE_TASK',
                details: 'Tạo công việc mới: "Hoàn thành báo cáo"',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                ipAddress: '192.168.1.2',
            },
            {
                id: '3',
                userId: '3',
                userName: 'Jane Smith',
                action: 'UPDATE_PROFILE',
                details: 'Cập nhật thông tin cá nhân',
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                ipAddress: '192.168.1.3',
            },
        ]);
    }, []);

    const getActionColor = (action: string) => {
        switch (action) {
            case 'LOGIN':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'CREATE_TASK':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case 'UPDATE_PROFILE':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'DELETE':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text)]">Nhật ký hoạt động</h1>
                    <p className="text-[var(--text-2)] mt-2">Theo dõi mọi hoạt động trong hệ thống</p>
                </div>
                <Button variant="outline">
                    <Download className="w-5 h-5 mr-2" />
                    Xuất báo cáo
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Filter className="w-5 h-5 text-[var(--text-2)]" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]"
                    >
                        <option value="all">Tất cả hoạt động</option>
                        <option value="login">Đăng nhập</option>
                        <option value="task">Công việc</option>
                        <option value="profile">Hồ sơ</option>
                    </select>
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[var(--surface-2)] border-b border-[var(--border)]">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text)]">Thời gian</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text)]">Người dùng</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text)]">Hành động</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text)]">Chi tiết</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text)]">IP Address</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-[var(--surface-2)] transition-colors">
                                    <td className="px-6 py-4 text-sm text-[var(--text-2)]">
                                        {new Date(log.timestamp).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                                                <span className="text-xs font-medium text-primary-600">
                                                    {log.userName.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-[var(--text)]">{log.userName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(
                                                log.action
                                            )}`}
                                        >
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-2)]">{log.details}</td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-3)] font-mono">{log.ipAddress}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
