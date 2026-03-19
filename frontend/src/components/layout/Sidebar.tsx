import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
    LayoutDashboard,
    CheckSquare,
    Calendar,
    CalendarRange,
    Timer,
    BarChart3,
    Bell,
    Settings,
    Clock,
    ChevronLeft,
    Users,
    Shield,
    FileText,
    Cog,
    Zap,
    Activity,
    Footprints,
} from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobile?: boolean;
    onClose?: () => void;
}

const userNavItems = [
    { path: '/app', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/app/tasks', icon: CheckSquare, label: 'Công việc' },
    { path: '/app/calendar', icon: Calendar, label: 'Lịch' },
    { path: '/app/planner', icon: CalendarRange, label: 'Lập kế hoạch' },
    { path: '/app/focus', icon: Timer, label: 'Focus' },
    { path: '/app/analytics', icon: BarChart3, label: 'Thống kê' },
    { path: '/app/fitness', icon: Activity, label: 'Fitness' },
    { path: '/app/gps-tracking', icon: Footprints, label: 'Track Lab' },
    { path: '/app/notifications', icon: Bell, label: 'Thông báo' },
    { path: '/app/settings', icon: Settings, label: 'Cài đặt' },
    { path: '/app/subscription', icon: Zap, label: 'Pro' },
];

const adminNavItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Admin Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Người dùng' },
    { path: '/admin/roles', icon: Shield, label: 'Phân quyền' },
    { path: '/admin/logs', icon: FileText, label: 'Audit Logs' },
    { path: '/admin/settings', icon: Cog, label: 'Hệ thống' },
];

export function Sidebar({ collapsed, onToggle, mobile, onClose }: SidebarProps) {
    const location = useLocation();
    const { user } = useAuthStore();
    const isAdmin = user?.role === 'ADMIN';

    const navItems = location.pathname.startsWith('/admin') && isAdmin ? adminNavItems : userNavItems;

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 z-40 h-screen border-r',
                'bg-[var(--sidebar-bg)]',
                'border-[var(--sidebar-border)]',
                'backdrop-blur-xl',
                'transition-all duration-300 ease-in-out',
                collapsed ? 'w-[72px]' : 'w-64',
                mobile && 'shadow-xl'
            )}
        >
            {/* Logo */}
            <div className={cn(
                'h-16 flex items-center justify-between px-4',
                'border-b border-[var(--sidebar-border)]'
            )}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Clock className="w-5 h-5 text-white" />
                    </div>
                    {!collapsed && (
                        <span className="text-lg font-bold text-[var(--text)]">
                            TimeManager
                        </span>
                    )}
                </div>
                {!mobile && (
                    <button
                        onClick={onToggle}
                        className={cn(
                            'rounded-lg p-1.5 text-[var(--text-3)] transition-colors hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--text)]',
                            collapsed && 'absolute -right-3 top-5 z-50',
                            collapsed && 'bg-[var(--surface-2)]',
                            collapsed && 'border border-[var(--border)]',
                            collapsed && 'shadow-lg'
                        )}
                    >
                        <ChevronLeft className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                onClick={mobile ? onClose : undefined}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                                        isActive
                                            ? 'border border-[var(--surface-highlight-border)] bg-[var(--sidebar-item-active)] text-[var(--primary)] shadow-[var(--shadow-sm)]'
                                            : 'text-[var(--text-2)]',
                                        !isActive && 'hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--text)]',
                                        collapsed && 'justify-center px-2'
                                    )
                                }
                                end={'end' in item ? item.end === true : false}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0" />
                                {!collapsed && <span>{item.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Admin section for admin users */}
                {isAdmin && !location.pathname.startsWith('/admin') && (
                    <>
                        <div className={cn('my-4 border-t border-[var(--divider)]', collapsed && 'mx-2')} />
                        <div className={cn('px-3 mb-2', collapsed && 'hidden')}>
                            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-3)]">
                                Admin
                            </span>
                        </div>
                        <NavLink
                            to="/admin"
                            onClick={mobile ? onClose : undefined}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                                    isActive
                                        ? 'border border-[var(--surface-highlight-border)] bg-[var(--sidebar-item-active)] text-[var(--primary)] shadow-[var(--shadow-sm)]'
                                        : 'text-[var(--text-2)] hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--text)]',
                                    collapsed && 'justify-center px-2'
                                )
                            }
                        >
                            <Shield className="w-5 h-5 flex-shrink-0" />
                            {!collapsed && <span>Admin Panel</span>}
                        </NavLink>
                    </>
                )}
            </nav>

            {/* User info */}
            {!collapsed && user && (
                <div className={cn(
                    'p-4 border-t',
                    'border-[var(--sidebar-border)]'
                )}>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-3)]">
                            <span className="text-sm font-medium text-[var(--text)]">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-[var(--text)]">
                                {user.name}
                            </p>
                            <p className="truncate text-xs text-[var(--text-2)]">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
