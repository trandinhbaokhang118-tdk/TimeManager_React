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
} from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobile?: boolean;
    onClose?: () => void;
}

const userNavItems = [
    { path: '/app', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/app/tasks', icon: CheckSquare, label: 'Công việc' },
    { path: '/app/calendar', icon: Calendar, label: 'Lịch' },
    { path: '/app/planner', icon: CalendarRange, label: 'Lập kế hoạch' },
    { path: '/app/focus', icon: Timer, label: 'Focus' },
    { path: '/app/analytics', icon: BarChart3, label: 'Thống kê' },
    { path: '/app/notifications', icon: Bell, label: 'Thông báo' },
    { path: '/app/settings', icon: Settings, label: 'Cài đặt' },
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
                'bg-white dark:bg-[var(--surface-1)] border-[var(--border)]',
                'backdrop-blur-xl',
                'flex flex-col transition-all duration-300 ease-in-out',
                collapsed ? 'w-[72px]' : 'w-64',
                mobile && 'shadow-xl'
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Clock className="w-5 h-5 text-white" />
                    </div>
                    {!collapsed && (
                        <span className="font-bold text-lg text-[var(--text)]">
                            TimeManager
                        </span>
                    )}
                </div>
                {!mobile && (
                    <button
                        onClick={onToggle}
                        className={cn(
                            'p-1 rounded-lg text-gray-400 hover:text-[var(--text)] transition-colors',
                            'hover:bg-gray-100 text-blue-900 dark:hover:bg-gray-800',
                            collapsed && 'absolute -right-3 top-5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-blue-500/30 shadow-sm'
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
                                            ? 'bg-blue-500 dark:bg-blue-500 text-gray-900 dark:text-gray-900'
                                            : 'text-gray-900 dark:text-gray-200 hover:bg-blue-400 dark:hover:bg-blue-400 hover:text-primary dark:hover:text-primary',
                                        collapsed && 'justify-center px-2'
                                    )
                                }
                                end={item.path === '/' || item.path === '/admin'}
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
                        <div className={cn('my-4 border-t border-gray-200 dark:border-blue-500/20', collapsed && 'mx-2')} />
                        <div className={cn('px-3 mb-2', collapsed && 'hidden')}>
                            <span className="text-xs font-semibold text-gray-400 dark:text-blue-200 uppercase tracking-wider">
                                Admin
                            </span>
                        </div>
                        <NavLink
                            to="/admin"
                            onClick={mobile ? onClose : undefined}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                                'text-gray-700 dark:text-gray-200 hover:bg-blue-400 dark:hover:bg-blue-200 hover:text-gray-900 dark:hover:text-white',
                                collapsed && 'justify-center px-2'
                            )}
                        >
                            <Shield className="w-5 h-5 flex-shrink-0" />
                            {!collapsed && <span>Admin Panel</span>}
                        </NavLink>
                    </>
                )}
            </nav>

            {/* User info */}
            {!collapsed && user && (
                <div className="p-4 border-t border-gray-200 dark:border-blue-500/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-blue-500/30 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-700 dark:text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-900 dark:text-gray-900 truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
