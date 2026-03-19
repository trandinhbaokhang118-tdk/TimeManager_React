import { useState, useEffect } from 'react';
import { Filter, Download, Activity, Clock, User, FileText, Shield } from 'lucide-react';
import '../../admin-theme.css';

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
    const [searchQuery, setSearchQuery] = useState('');

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
            {
                id: '4',
                userId: '4',
                userName: 'Mike Johnson',
                action: 'DELETE',
                details: 'Xóa công việc: "Task cũ"',
                timestamp: new Date(Date.now() - 10800000).toISOString(),
                ipAddress: '192.168.1.4',
            },
            {
                id: '5',
                userId: '5',
                userName: 'Sarah Lee',
                action: 'LOGIN',
                details: 'Đăng nhập thất bại',
                timestamp: new Date(Date.now() - 14400000).toISOString(),
                ipAddress: '192.168.1.5',
            },
        ]);
    }, []);

    const filteredLogs = logs.filter(log =>
        log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getActionIcon = (action: string) => {
        switch (action) {
            case 'LOGIN': return <Shield className="w-4 h-4" />;
            case 'CREATE_TASK': return <FileText className="w-4 h-4" />;
            case 'UPDATE_PROFILE': return <User className="w-4 h-4" />;
            case 'DELETE': return <Activity className="w-4 h-4" />;
            default: return <Activity className="w-4 h-4" />;
        }
    };

    const getActionColor = (action: string) => {
        switch (action) {
            case 'LOGIN':
                return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-500/30';
            case 'CREATE_TASK':
                return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30';
            case 'UPDATE_PROFILE':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30';
            case 'DELETE':
                return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400 border-gray-200 dark:border-gray-500/30';
        }
    };

    return (
        <div className="admin-theme admin-container p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="admin-title mb-2">Nhật ký hoạt động</h1>
                    <p className="admin-title-sub">Theo dõi mọi hoạt động trong hệ thống</p>
                </div>
                <button className="admin-btn admin-btn-primary">
                    <Download className="w-5 h-5" />
                    Xuất báo cáo
                </button>
            </div>

            {/* Filters */}
            <div className="admin-glass-card p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="admin-input"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Filter className="w-5 h-5" style={{ color: 'var(--admin-text-muted)' }} />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="admin-select"
                        >
                            <option value="all">Tất cả hoạt động</option>
                            <option value="login">Đăng nhập</option>
                            <option value="task">Công việc</option>
                            <option value="profile">Hồ sơ</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Logs Table */}
            <div className="admin-glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Thời gian</th>
                                <th>Người dùng</th>
                                <th>Hành động</th>
                                <th>Chi tiết</th>
                                <th>IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log) => (
                                <tr key={log.id}>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" style={{ color: 'var(--admin-neon-primary)', opacity: 0.5 }} />
                                            {new Date(log.timestamp).toLocaleString('vi-VN')}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="admin-avatar">
                                                {log.userName.charAt(0).toUpperCase()}
                                            </div>
                                            <span>{log.userName}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getActionColor(log.action)}`}
                                        >
                                            {getActionIcon(log.action)}
                                            {log.action}
                                        </span>
                                    </td>
                                    <td>{log.details}</td>
                                    <td>
                                        <span className="font-mono">{log.ipAddress}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
