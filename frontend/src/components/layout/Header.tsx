import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    Search,
    Plus,
    Bell,
    Moon,
    Sun,
    Menu,
    LogOut,
    User,
    Settings,
    Command,
    Home,
} from 'lucide-react';
import { Button, UserAvatar } from '../ui';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useAuthStore } from '../../store/auth.store';
import { useNotificationStore } from '../../store/notification.store';
import { notificationsService } from '../../services/notifications.service';
import { useDarkMode } from '../../hooks/useDarkMode';
import { cn } from '../../lib/utils';
import { CommandPalette } from './CommandPalette';
import { QuickAddModal } from './QuickAddModal';

interface HeaderProps {
    sidebarCollapsed: boolean;
    onMenuClick: () => void;
}

export function Header({ sidebarCollapsed, onMenuClick }: HeaderProps) {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const { unreadCount, setNotifications } = useNotificationStore();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [commandOpen, setCommandOpen] = useState(false);
    const [quickAddOpen, setQuickAddOpen] = useState(false);

    // Fetch notifications
    const { data: notificationsData } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => notificationsService.getAll(1, 10),
        refetchInterval: 30000, // Refetch every 30 seconds
    });

    // Update store when data changes
    useEffect(() => {
        if (notificationsData?.data) {
            setNotifications(notificationsData.data);
        }
    }, [notificationsData, setNotifications]);

    // Keyboard shortcut for command palette
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setCommandOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 right-0 z-30 h-16 bg-[var(--surface-1)] backdrop-blur-xl',
                    'border-b border-[var(--border)]',
                    'transition-all duration-300',
                    sidebarCollapsed ? 'left-[72px]' : 'left-64',
                    'max-md:left-0'
                )}
            >
                <div className="h-full px-4 flex items-center justify-between gap-4">
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                        {/* Mobile menu button */}
                        <button
                            onClick={onMenuClick}
                            className="md:hidden p-2 rounded-lg text-[var(--text-2)] hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Search / Command palette trigger */}
                        <button
                            onClick={() => setCommandOpen(true)}
                            className={cn(
                                'flex items-center gap-2 px-3 py-2 rounded-lg',
                                'bg-[var(--surface-1)] border border-[var(--border)] text-[var(--text-2)]',
                                'hover:bg-blue-200 hover:text-black/90 dark:hover:bg-blue-100 transition-colors',
                                'w-64 max-md:w-auto'
                            )}
                        >
                            <Search className="w-4 h-4" />
                            <span className="text-sm max-md:hidden">Tìm kiếm...</span>
                            <kbd
                                className="ml-auto hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-white bg-gradient-to-r from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6] rounded"
                            >
                                <Command className="w-3 h-3" />K
                            </kbd>
                        </button>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {/* Home link */}
                        <Link to="/">
                            <Button
                                size="sm"
                                variant="ghost"
                                className="gap-1.5"
                                title="Về trang chủ"
                            >
                                <Home className="w-4 h-4" />
                                <span className="max-sm:hidden">Trang chủ</span>
                            </Button>
                        </Link>

                        {/* Quick Add button */}
                        <Button
                            size="sm"
                            onClick={() => setQuickAddOpen(true)}
                            className="gap-1.5 bg-blue-500 text-white hover:bg-blue-600"

                        >
                            <Plus className="w-4 h-4" />
                            <span className="max-sm:hidden">Thêm nhanh</span>
                        </Button>

                        {/* Notifications */}
                        <button
                            onClick={() => navigate('/app/notifications')}
                            className="relative p-2 rounded-lg text-[var(--text-2)] hover:bg-blue-500 dark:hover:bg-ble-500 text-gray-900 transition-colors"
                        >
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--danger)] text-white text-xs font-medium rounded-full flex items-center justify-center">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Dark mode toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg text-[var(--text-2)] hover:bg-blue-500 dark:hover:bg-ble-500 text-gray-900 transition-colors"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* User menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 p-1 rounded-lg dark:hover:bg-gray-900 transition-colors dark:text-gray-900">
                                    <UserAvatar name={user?.name || 'User'} size="sm" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 dark:text-gray-900">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-black/90">
                                            {user?.name || "User"}
                                        </span>

                                        <span className="text-xs text-black/90">
                                            {user?.email}
                                        </span>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate('/app/settings')}>
                                    <User className="w-4 h-4 mr-2" />
                                    Hồ sơ
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/app/settings')}>
                                    <Settings className="w-4 h-4 mr-2" />
                                    Cài đặt
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate('/')}>
                                    <Home className="w-4 h-4 mr-2" />
                                    Về trang chủ
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Đăng xuất
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Command Palette */}
            <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />

            {/* Quick Add Modal */}
            <QuickAddModal open={quickAddOpen} onOpenChange={setQuickAddOpen} />
        </>
    );
}
