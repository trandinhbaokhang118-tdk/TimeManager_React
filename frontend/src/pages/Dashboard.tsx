import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
    CheckCircle2,
    Clock,
    AlertTriangle,
    TrendingUp,
    Plus,
    ArrowRight,
    Calendar,
    Timer,
    Sparkles,
} from 'lucide-react';
import { Button, Badge, SkeletonStats, ErrorState } from '../components/ui';
import { AIScheduleModal } from '../components/ai-schedule/AIScheduleModal';
import { dashboardService } from '../services/dashboard.service';
import { tasksService } from '../services/tasks.service';
import { useAuthStore } from '../store/auth.store';
import { cn, formatDate, isOverdue } from '../lib/utils';
import type { Task } from '../types';

export function Dashboard() {
    const { user } = useAuthStore();
    const [showAISchedule, setShowAISchedule] = useState(false);

    const { data: stats, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useQuery({
        queryKey: ['dashboard', 'stats'],
        queryFn: dashboardService.getStats,
    });

    const { data: tasksData, isLoading: tasksLoading } = useQuery({
        queryKey: ['tasks', { limit: 10, sortBy: 'dueAt', sortOrder: 'asc', status: 'TODO' }],
        queryFn: () => tasksService.getAll({
            limit: 10,
            sortBy: 'dueAt',
            sortOrder: 'asc',
            status: 'TODO',
        }),
    });

    const { data: focusStats } = useQuery({
        queryKey: ['dashboard', 'focus'],
        queryFn: dashboardService.getFocusTime,
    });

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Chào buổi sáng';
        if (hour < 18) return 'Chào buổi chiều';
        return 'Chào buổi tối';
    };

    if (statsError) {
        return <ErrorState onRetry={refetchStats} />;
    }

    return (
        <div className="space-y-6 pb-20 md:pb-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {greeting()}, {user?.name?.split(' ')[0]} 👋
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Hôm nay là {formatDate(new Date(), { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setShowAISchedule(true)}
                        className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800"
                    >
                        <Sparkles className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                        <span className="text-purple-600 dark:text-purple-400">AI Sắp xếp</span>
                    </Button>
                    <Button variant="outline" asChild className="text-gray-900 dark:text-white">
                        <Link to="/calendar">
                            <Calendar className="w-4 h-4 mr-2" />
                            Xem lịch
                        </Link>
                    </Button>
                    <Button asChild className="text-gray-900 dark:text-white">
                        <Link to="/focus">
                            <Timer className="w-4 h-4 mr-2" />
                            Bắt đầu Focus
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            {statsLoading ? (
                <SkeletonStats count={4} />
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Việc hôm nay"
                        value={stats?.tasksDueToday || 0}
                        icon={Clock}
                        color="blue"
                    />
                    <StatCard
                        title="Quá hạn"
                        value={stats?.tasksOverdue || 0}
                        icon={AlertTriangle}
                        color="red"
                        alert={stats?.tasksOverdue ? stats.tasksOverdue > 0 : false}
                    />
                    <StatCard
                        title="Hoàn thành tuần này"
                        value={stats?.tasksCompletedThisWeek || 0}
                        icon={CheckCircle2}
                        color="green"
                    />
                    <StatCard
                        title="Giờ Focus tuần này"
                        value={focusStats?.totalHours || 0}
                        suffix="h"
                        icon={TrendingUp}
                        color="purple"
                    />
                </div>
            )}

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Today's Plan */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Kế hoạch hôm nay
                        </h2>
                        <Link
                            to="/tasks"
                            className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                        >
                            Xem tất cả
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className=" dark:bg-[#1A2942]  border border-gray-200 dark:border-blue-900/50 shadow-md rounded-xl divide-y divide-gray-100 dark:divide-blue-900/20">
                        {tasksLoading ? (
                            <div className="p-4 space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="animate-pulse flex gap-3">
                                        <div className="w-5 h-5 rounded bg-gray-200 dark:bg-blue-900/30" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 dark:bg-blue-900/30 rounded w-3/4" />
                                            <div className="h-3 bg-gray-200 dark:bg-blue-900/30 rounded w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : tasksData?.data && tasksData.data.length > 0 ? (
                            tasksData.data.map((task) => (
                                <TaskItem key={task.id} task={task} />
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <Sparkles className="w-12 h-12 text-gray-300 dark:text-blue-400/30 mx-auto mb-3" />
                                <p className="text-gray-500 dark:text-gray-300 mb-4">
                                    Chưa có công việc nào cho hôm nay
                                </p>
                                <Button asChild size="sm" className='text-gray-900'>
                                    <Link to="/tasks">
                                        <Plus className="w-4 h-4 mr-1 text-gray-900" />
                                        Tạo công việc
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className=" dark:bg-[#1A2942] border border-gray-200 dark:border-blue-900/50 shadow-md rounded-xl p-4 transition-all hover:border-blue-500/40">
                        <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
                            Thao tác nhanh
                        </h3>

                        <div className="space-y-2">
                            <QuickAction icon={Plus} label="Tạo công việc mới" to="/tasks?new=true" />
                            <QuickAction icon={Calendar} label="Lên lịch công việc" to="/calendar" />
                            <QuickAction icon={Timer} label="Bắt đầu Pomodoro" to="/focus" />
                        </div>
                    </div>



                    {/* Productivity Tips */}
                    <div className="bg-gradient-to-br from-[#12C2FF]/10 via-[#3B82F6]/10 to-[#8B5CF6]/10 border border-[var(--primary)]/20 shadow-[var(--shadow-md)] rounded-xl backdrop-blur-xl p-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6] text-white shadow-lg">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                                    Mẹo năng suất
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Hãy bắt đầu ngày mới bằng việc hoàn thành công việc khó nhất trước!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Schedule Modal */}
            <AIScheduleModal open={showAISchedule} onOpenChange={setShowAISchedule} />
        </div>
    );
}

// Stat Card Component
interface StatCardProps {
    title: string;
    value: number;
    suffix?: string;
    icon: React.ElementType;
    color: 'blue' | 'red' | 'green' | 'purple';
    alert?: boolean;
}

function StatCard({ title, value, suffix, icon: Icon, color, alert }: StatCardProps) {
    const colors = {
        blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
        green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
        purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    };

    return (
        <div className={cn(
            ' dark:bg-[#1A2942] border border-gray-200 dark:border-blue-900/50 shadow-md rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1',
            alert && 'ring-2 ring-red-500 ring-offset-2 dark:ring-offset-gray-900'
        )}>
            <div className="flex items-center justify-between mb-3">
                <div className={cn('p-2 rounded-lg', colors[color])}>
                    <Icon className="w-5 h-5" />
                </div>
                {alert && (
                    <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {value}{suffix}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
        </div>
    );
}

// Task Item Component
function TaskItem({ task }: { task: Task }) {
    const overdue = task.status !== 'DONE' && isOverdue(task.dueAt);

    return (
        <Link
            to={`/tasks?id=${task.id}`}
            className="flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
            <div
                className={cn(
                    'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5',
                    task.status === 'DONE'
                        ? 'bg-green-500 border-green-500'
                        : overdue
                            ? 'border-red-500'
                            : 'border-gray-300 dark:border-gray-600'
                )}
            >
                {task.status === 'DONE' && (
                    <CheckCircle2 className="w-full h-full text-white p-0.5" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p
                    className={cn(
                        'font-medium truncate',
                        task.status === 'DONE'
                            ? 'text-gray-400 line-through'
                            : 'text-gray-900 dark:text-white'
                    )}
                >
                    {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    {task.dueAt && (
                        <span
                            className={cn(
                                'text-xs',
                                overdue ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                            )}
                        >
                            {formatDate(task.dueAt, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    )}
                    {task.priority === 'HIGH' && (
                        <Badge variant="danger" className="text-xs py-0">Cao</Badge>
                    )}
                </div>
            </div>
        </Link>
    );
}

// Quick Action Component
function QuickAction({ icon: Icon, label, to }: { icon: React.ElementType; label: string; to: string }) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-500 dark:hover:bg-blue-900/30 transition-colors group"
        >
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 transition-colors">
                <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-300" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">{label}</span>
        </Link>
    );
}
