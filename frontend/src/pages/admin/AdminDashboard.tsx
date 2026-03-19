import { useState, useEffect } from 'react';
import { Users, CheckSquare, TrendingUp, UserCheck, Clock, AlertCircle, Zap, Activity } from 'lucide-react';
import { Button } from '../../components/ui';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LineChart, Line, PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import '../../admin-theme.css';

// Mock data for charts
const userGrowthData = [
    { day: 'T2', users: 12 }, { day: 'T3', users: 19 },
    { day: 'T4', users: 15 }, { day: 'T5', users: 28 },
    { day: 'T6', users: 35 }, { day: 'T7', users: 42 },
    { day: 'CN', users: 38 },
];

const taskData = [
    { name: 'Hoàn thành', value: 156, color: '#22C55E' },
    { name: 'Đang làm', value: 89, color: '#3B82F6' },
    { name: 'Chưa làm', value: 67, color: '#6B7280' },
    { name: 'Quá hạn', value: 23, color: '#EF4444' },
];

const activityData = [
    { hour: '6h', activities: 5 }, { hour: '8h', activities: 23 },
    { hour: '10h', activities: 45 }, { hour: '12h', activities: 18 },
    { hour: '14h', activities: 38 }, { hour: '16h', activities: 52 },
    { hour: '18h', activities: 29 }, { hour: '20h', activities: 15 },
];

interface Stats {
    totalUsers: number;
    activeUsers: number;
    totalTasks: number;
    completedTasks: number;
    avgTasksPerUser: number;
    newUsersToday: number;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

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
            iconColor1: '#00E5FF',
            iconColor2: '#3B82F6',
            iconShadow: '#00E5FF',
            change: `+${stats.newUsersToday} hôm nay`,
        },
        {
            title: 'Người dùng hoạt động',
            value: stats.activeUsers,
            icon: UserCheck,
            iconColor1: '#22C55E',
            iconColor2: '#10B981',
            iconShadow: '#22C55E',
            change: `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}% tổng`,
        },
        {
            title: 'Tổng công việc',
            value: stats.totalTasks,
            icon: CheckSquare,
            iconColor1: '#8B5CF6',
            iconColor2: '#EC4899',
            iconShadow: '#8B5CF6',
            change: `${stats.completedTasks} hoàn thành`,
        },
        {
            title: 'TB công việc/người',
            value: stats.avgTasksPerUser.toFixed(1),
            icon: TrendingUp,
            iconColor1: '#F59E0B',
            iconColor2: '#EF4444',
            iconShadow: '#F59E0B',
            change: 'Trung bình',
        },
    ];

    if (loading) {
        return (
            <div className="admin-theme admin-container flex items-center justify-center">
                <div className="admin-spinner"></div>
            </div>
        );
    }

    return (
        <div className="admin-theme admin-container p-6 md:p-8 transition-colors duration-300">
            {/* Header */}
            <motion.div
                className="mb-8"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
            >
                <h1 className="admin-title mb-1">
                    Admin Dashboard
                </h1>
                <p className="admin-title-sub">Tổng quan hệ thống và quản lý</p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInUp}
                        className="admin-stat-card"
                        style={{
                            '--icon-color-1': stat.iconColor1,
                            '--icon-color-2': stat.iconColor2,
                            '--icon-shadow': stat.iconShadow,
                        } as React.CSSProperties}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="stat-icon">
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="w-2 h-2 rounded-full admin-pulse" style={{ background: stat.iconColor1 }}></div>
                        </div>
                        <p className="stat-title">{stat.title}</p>
                        <p className="stat-value">{stat.value}</p>
                        <p className="stat-change" style={{ color: stat.iconColor1 }}>{stat.change}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Charts Row */}
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {/* User Growth - LineChart */}
                <motion.div
                    variants={fadeInUp}
                    className="admin-glass-card p-6"
                >
                    <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--admin-text)' }}>
                        Tăng trưởng người dùng
                    </h3>
                    <p className="text-xs mb-6" style={{ color: 'var(--admin-text-muted)' }}>
                        Số người dùng mới theo ngày (7 ngày qua)
                    </p>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,229,255,0.1)" />
                            <XAxis
                                dataKey="day"
                                tick={{ fill: 'rgba(248,250,252,0.5)', fontSize: 12 }}
                                axisLine={{ stroke: 'rgba(0,229,255,0.2)' }}
                            />
                            <YAxis
                                tick={{ fill: 'rgba(248,250,252,0.5)', fontSize: 12 }}
                                axisLine={{ stroke: 'rgba(0,229,255,0.2)' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: 'rgba(10,20,40,0.9)',
                                    border: '1px solid rgba(0,229,255,0.3)',
                                    borderRadius: 8,
                                    color: '#fff',
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="#00E5FF"
                                strokeWidth={3}
                                dot={{ fill: '#00E5FF', r: 4 }}
                                activeDot={{ r: 6, fill: '#00E5FF' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Task Completion - PieChart Donut */}
                <motion.div
                    variants={fadeInUp}
                    className="admin-glass-card p-6"
                >
                    <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--admin-text)' }}>
                        Tình trạng công việc
                    </h3>
                    <p className="text-xs mb-6" style={{ color: 'var(--admin-text-muted)' }}>
                        Phân bổ công việc theo trạng thái
                    </p>
                    <div className="flex items-center">
                        <ResponsiveContainer width="50%" height={220}>
                            <PieChart>
                                <Pie
                                    data={taskData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={85}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {taskData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(10,20,40,0.9)',
                                        border: '1px solid rgba(0,229,255,0.3)',
                                        borderRadius: 8,
                                        color: '#fff',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex-1 space-y-3">
                            {taskData.map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full flex-shrink-0"
                                        style={{ background: item.color }}
                                    ></div>
                                    <span className="text-sm" style={{ color: 'var(--admin-text-secondary)' }}>
                                        {item.name}
                                    </span>
                                    <span className="text-sm font-semibold ml-auto" style={{ color: 'var(--admin-text)' }}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Activity Timeline - BarChart */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="admin-glass-card p-6 mb-8"
            >
                <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--admin-text)' }}>
                    Hoạt động theo giờ
                </h3>
                <p className="text-xs mb-6" style={{ color: 'var(--admin-text-muted)' }}>
                    Số hoạt động người dùng trong ngày
                </p>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={activityData} barCategoryGap="30%">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,229,255,0.1)" />
                        <XAxis
                            dataKey="hour"
                            tick={{ fill: 'rgba(248,250,252,0.5)', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(0,229,255,0.2)' }}
                        />
                        <YAxis
                            tick={{ fill: 'rgba(248,250,252,0.5)', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(0,229,255,0.2)' }}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(10,20,40,0.9)',
                                border: '1px solid rgba(0,229,255,0.3)',
                                borderRadius: 8,
                                color: '#fff',
                            }}
                        />
                        <Bar dataKey="activities" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="admin-glass-card p-6 mb-8"
            >
                <h2 className="text-lg font-semibold mb-5 flex items-center gap-2" style={{ color: 'var(--admin-text)' }}>
                    <Zap className="w-5 h-5" style={{ color: '#00E5FF' }} />
                    Thao tác nhanh
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/admin/users">
                        <Button variant="outline" className="w-full justify-start h-auto py-4">
                            <Users className="w-5 h-5 mr-3" style={{ color: '#00E5FF' }} />
                            <div className="text-left">
                                <p className="font-medium" style={{ color: 'var(--admin-text)' }}>Quản lý người dùng</p>
                                <p className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>Xem và chỉnh sửa</p>
                            </div>
                        </Button>
                    </Link>
                    <Link to="/admin/activity">
                        <Button variant="outline" className="w-full justify-start h-auto py-4">
                            <Activity className="w-5 h-5 mr-3" style={{ color: '#8B5CF6' }} />
                            <div className="text-left">
                                <p className="font-medium" style={{ color: 'var(--admin-text)' }}>Hoạt động hệ thống</p>
                                <p className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>Logs và monitoring</p>
                            </div>
                        </Button>
                    </Link>
                    <Link to="/admin/settings">
                        <Button variant="outline" className="w-full justify-start h-auto py-4">
                            <AlertCircle className="w-5 h-5 mr-3" style={{ color: '#F59E0B' }} />
                            <div className="text-left">
                                <p className="font-medium" style={{ color: 'var(--admin-text)' }}>Cài đặt hệ thống</p>
                                <p className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>Cấu hình và tùy chỉnh</p>
                            </div>
                        </Button>
                    </Link>
                </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="admin-glass-card p-6"
            >
                <h2 className="text-lg font-semibold mb-5 flex items-center gap-2" style={{ color: 'var(--admin-text)' }}>
                    <Activity className="w-5 h-5" style={{ color: '#00E5FF' }} />
                    Hoạt động gần đây
                </h2>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group"
                            style={{ background: 'rgba(0,229,255,0.03)' }}
                        >
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ background: 'rgba(0,229,255,0.1)' }}
                            >
                                <Clock className="w-5 h-5" style={{ color: '#00E5FF' }} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium" style={{ color: 'var(--admin-text)' }}>
                                    Người dùng mới đăng ký
                                </p>
                                <p className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>
                                    {i} phút trước
                                </p>
                            </div>
                            <div
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ background: 'rgba(0,229,255,0.5)' }}
                            ></div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
