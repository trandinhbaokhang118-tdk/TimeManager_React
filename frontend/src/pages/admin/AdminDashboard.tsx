import { useState, useEffect } from 'react';
import { Users, CheckSquare, Activity, TrendingUp, UserCheck, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui';
import api from '../../services/api';

interface Stats {
    totalUsers: number;
    activeUsers: number;
    totalTasks: number;
    completedTasks: number;
    avgTasksPerUser: number;
    newUsersToday: number;
}

export function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        totalUsers: 0,
        activeUsers: 0,
        totalTasks: 0,
        completedTasks: 0,
        avgTasksPerUser: 0,
        newUsersToday: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/admin/stats');
            setStats(response.data.data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Tổng người dùng',
            value: stats.totalUsers,
            icon: Users,
            color: 'from-blue-500 to-blue-600',
            change: `+${stats.newUsersToday} hôm nay`,
        },
        {
            title: 'Người dùng hoạt động',
            value: stats.activeUsers,
            icon: UserCheck,
            color: 'from-green-500 to-green-600',
            change: `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}% tổng`,
        },
        {
            title: 'Tổng công việc',
            value: stats.totalTasks,
            icon: CheckSquare,
            color: 'from-purple-500 to-purple-600',
            change: `${stats.completedTasks} hoàn thành`,
        },
        {
            title: 'TB công việc/người',
            value: stats.avgTasksPerUser.toFixed(1),
            icon: TrendingUp,
            color: 'from-orange-500 to-orange-600',
            change: 'Trung bình',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-[var(--text)]">Admin Dashboard</h1>
                <p className="text-[var(--text-2)] mt-2">Tổng quan hệ thống và quản lý</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-6 hover:shadow-[var(--shadow-lg)] transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h3 className="text-sm font-medium text-[var(--text-2)] mb-1">{stat.title}</h3>
                        <p className="text-3xl font-bold text-[var(--text)] mb-2">{stat.value}</p>
                        <p className="text-xs text-[var(--text-3)]">{stat.change}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-6">
                <h2 className="text-xl font-bold text-[var(--text)] mb-4">Thao tác nhanh</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="justify-start h-auto py-4">
                        <Users className="w-5 h-5 mr-3" />
                        <div className="text-left">
                            <p className="font-medium">Quản lý người dùng</p>
                            <p className="text-xs text-[var(--text-3)]">Xem và chỉnh sửa</p>
                        </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-4">
                        <Activity className="w-5 h-5 mr-3" />
                        <div className="text-left">
                            <p className="font-medium">Hoạt động hệ thống</p>
                            <p className="text-xs text-[var(--text-3)]">Logs và monitoring</p>
                        </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-4">
                        <AlertCircle className="w-5 h-5 mr-3" />
                        <div className="text-left">
                            <p className="font-medium">Báo cáo lỗi</p>
                            <p className="text-xs text-[var(--text-3)]">Xem và xử lý</p>
                        </div>
                    </Button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-6">
                <h2 className="text-xl font-bold text-[var(--text)] mb-4">Hoạt động gần đây</h2>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--surface-2)] transition-colors">
                            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-primary-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-[var(--text)]">Người dùng mới đăng ký</p>
                                <p className="text-xs text-[var(--text-3)]">{i} phút trước</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
