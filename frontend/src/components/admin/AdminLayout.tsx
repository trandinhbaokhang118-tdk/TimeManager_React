import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, Activity, Database, Shield, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { Button } from '../ui';

export function AdminLayout() {
    const { user, logout } = useAuthStore();

    const navItems = [
        { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
        { to: '/admin/users', icon: Users, label: 'Người dùng' },
        { to: '/admin/activity', icon: Activity, label: 'Hoạt động' },
        { to: '/admin/database', icon: Database, label: 'Database' },
        { to: '/admin/settings', icon: Settings, label: 'Cài đặt' },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg)]">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-[var(--surface-1)] border-r border-[var(--border)] backdrop-blur-xl z-50">
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-[var(--border)]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-[var(--text)]">Admin Panel</h1>
                                <p className="text-xs text-[var(--text-3)]">TimeManager</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                        : 'text-[var(--text-2)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                                    }`
                                }
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Info */}
                    <div className="p-4 border-t border-[var(--border)]">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary-600">
                                    {user?.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[var(--text)] truncate">{user?.name}</p>
                                <p className="text-xs text-[var(--text-3)] truncate">{user?.email}</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full" onClick={logout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Đăng xuất
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 min-h-screen">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
