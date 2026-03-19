import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { ElementType } from 'react';
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
        queryFn: () =>
            tasksService.getAll({
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
        <div className="page-shell space-y-6 pb-20 md:pb-0">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text)]">
                        {greeting()}, {user?.name?.split(' ')[0]} 👋
                    </h1>
                    <p className="mt-1 text-[var(--text-2)]">
                        Hôm nay là {formatDate(new Date(), { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setShowAISchedule(true)}
                        className="border-[var(--surface-highlight-border)] bg-[var(--surface-highlight)] text-[var(--primary)] hover:bg-[var(--surface-3)] hover:text-[var(--primary)]"
                    >
                        <Sparkles className="mr-2 h-4 w-4" />
                        AI sắp xếp
                    </Button>
                    <Button variant="outline" asChild>
                        <Link to="/app/calendar">
                            <Calendar className="mr-2 h-4 w-4" />
                            Xem lịch
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link to="/app/focus">
                            <Timer className="mr-2 h-4 w-4" />
                            Bắt đầu focus
                        </Link>
                    </Button>
                </div>
            </div>

            {statsLoading ? (
                <SkeletonStats count={4} />
            ) : (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
                        title="Giờ focus tuần này"
                        value={focusStats?.totalHours || 0}
                        suffix="h"
                        icon={TrendingUp}
                        color="primary"
                    />
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-[var(--text)]">Kế hoạch hôm nay</h2>
                        <Link
                            to="/app/tasks"
                            className="flex items-center gap-1 text-sm text-[var(--primary)] transition-colors hover:text-[var(--text)]"
                        >
                            Xem tất cả
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="surface-panel overflow-hidden divide-y divide-[var(--divider)]">
                        {tasksLoading ? (
                            <div className="space-y-3 p-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="skeleton h-5 w-5 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <div className="skeleton h-4 w-3/4 rounded" />
                                            <div className="skeleton h-3 w-1/2 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : tasksData?.data && tasksData.data.length > 0 ? (
                            tasksData.data.map((task) => <TaskItem key={task.id} task={task} />)
                        ) : (
                            <div className="p-8 text-center">
                                <Sparkles className="mx-auto mb-3 h-12 w-12 text-[var(--text-3)]" />
                                <p className="mb-4 text-[var(--text-2)]">Chưa có công việc nào cho hôm nay</p>
                                <Button asChild size="sm">
                                    <Link to="/app/tasks">
                                        <Plus className="mr-1 h-4 w-4" />
                                        Tạo công việc
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="surface-panel p-4">
                        <h3 className="mb-3 font-medium text-[var(--text)]">Thao tác nhanh</h3>
                        <div className="space-y-2">
                            <QuickAction icon={Plus} label="Tạo công việc mới" to="/app/tasks?new=true" />
                            <QuickAction icon={Calendar} label="Lên lịch công việc" to="/app/calendar" />
                            <QuickAction icon={Timer} label="Bắt đầu Pomodoro" to="/app/focus" />
                        </div>
                    </div>

                    <div className="challenge-banner p-4">
                        <div className="relative z-10 flex items-start gap-3">
                            <div className="rounded-lg bg-[image:var(--primary-gradient)] p-2 text-[var(--btn-primary-text)] shadow-[var(--primary-glow)]">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="mb-1 font-medium text-[var(--text)]">Mẹo năng suất</h3>
                                <p className="text-sm text-[var(--text-2)]">
                                    Hãy bắt đầu ngày mới bằng việc hoàn thành công việc khó nhất trước.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AIScheduleModal open={showAISchedule} onOpenChange={setShowAISchedule} />
        </div>
    );
}

interface StatCardProps {
    title: string;
    value: number;
    suffix?: string;
    icon: ElementType;
    color: 'blue' | 'red' | 'green' | 'primary';
    alert?: boolean;
}

function StatCard({ title, value, suffix, icon: Icon, color, alert }: StatCardProps) {
    const colors = {
        blue: 'bg-info-var',
        red: 'bg-danger-var',
        green: 'bg-success-var',
        primary: 'border border-[var(--surface-highlight-border)] bg-[var(--surface-highlight)] text-[var(--primary)]',
    };

    return (
        <div
            className={cn(
                'surface-card-hover p-4',
                alert && 'ring-2 ring-red-500 ring-offset-2 ring-offset-[var(--bg-body)]'
            )}
        >
            <div className="mb-3 flex items-center justify-between">
                <div className={cn('rounded-lg p-2', colors[color])}>
                    <Icon className="h-5 w-5" />
                </div>
                {alert && (
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-[var(--text)]">
                {value}
                {suffix}
            </p>
            <p className="text-sm text-[var(--text-2)]">{title}</p>
        </div>
    );
}

function TaskItem({ task }: { task: Task }) {
    const overdue = task.status !== 'DONE' && isOverdue(task.dueAt);

    return (
        <Link
            to={`/app/tasks?id=${task.id}`}
            className="flex items-start gap-3 p-4 transition-colors hover:bg-[var(--surface-3)]"
        >
            <div
                className={cn(
                    'mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2',
                    task.status === 'DONE'
                        ? 'border-green-500 bg-green-500'
                        : overdue
                          ? 'border-red-500'
                          : 'border-[var(--border-strong)]'
                )}
            >
                {task.status === 'DONE' && <CheckCircle2 className="h-full w-full p-0.5 text-white" />}
            </div>
            <div className="min-w-0 flex-1">
                <p
                    className={cn(
                        'truncate font-medium',
                        task.status === 'DONE' ? 'text-[var(--text-3)] line-through' : 'text-[var(--text)]'
                    )}
                >
                    {task.title}
                </p>
                <div className="mt-1 flex items-center gap-2">
                    {task.dueAt && (
                        <span className={cn('text-xs', overdue ? 'text-red-500' : 'text-[var(--text-2)]')}>
                            {formatDate(task.dueAt, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    )}
                    {task.priority === 'HIGH' && (
                        <Badge variant="danger" className="py-0 text-xs">
                            Cao
                        </Badge>
                    )}
                </div>
            </div>
        </Link>
    );
}

function QuickAction({ icon: Icon, label, to }: { icon: ElementType; label: string; to: string }) {
    return (
        <Link
            to={to}
            className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--surface-highlight)]"
        >
            <div className="rounded-lg bg-[var(--surface-3)] p-2 transition-colors group-hover:bg-[var(--surface-highlight)]">
                <Icon className="h-4 w-4 text-[var(--text-2)] transition-colors group-hover:text-[var(--primary)]" />
            </div>
            <span className="text-sm text-[var(--text-2)] transition-colors group-hover:text-[var(--text)]">
                {label}
            </span>
        </Link>
    );
}
