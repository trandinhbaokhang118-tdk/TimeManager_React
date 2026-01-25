import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import AIChatbot from '../chatbot/AIChatbot';
import { cn } from '../../lib/utils';

export function AppLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Load sidebar state from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('sidebarCollapsed');
        if (saved) {
            setSidebarCollapsed(saved === 'true');
        }
    }, []);

    const toggleSidebar = () => {
        const newValue = !sidebarCollapsed;
        setSidebarCollapsed(newValue);
        localStorage.setItem('sidebarCollapsed', String(newValue));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0A1628]">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar
                    collapsed={sidebarCollapsed}
                    onToggle={toggleSidebar}
                />
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div
                className={cn(
                    'fixed inset-y-0 left-0 z-40 md:hidden transform transition-transform duration-300',
                    mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <Sidebar
                    collapsed={false}
                    onToggle={() => { }}
                    mobile
                    onClose={() => setMobileMenuOpen(false)}
                />
            </div>

            {/* Header */}
            <Header
                sidebarCollapsed={sidebarCollapsed}
                onMenuClick={() => setMobileMenuOpen(true)}
            />

            {/* Main Content */}
            <main
                className={cn(
                    'pt-16 min-h-screen transition-all duration-300',
                    sidebarCollapsed ? 'md:pl-[72px]' : 'md:pl-64'
                )}
            >
                <div className="p-4 md:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <MobileBottomNav />

            {/* AI Chatbot */}
            <AIChatbot />
        </div>
    );
}

// Mobile Bottom Navigation
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    CheckSquare,
    Calendar,
    Timer,
    MoreHorizontal,
} from 'lucide-react';

function MobileBottomNav() {
    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Home' },
        { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
        { path: '/calendar', icon: Calendar, label: 'Calendar' },
        { path: '/focus', icon: Timer, label: 'Focus' },
        { path: '/settings', icon: MoreHorizontal, label: 'More' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-pb">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                'flex flex-col items-center justify-center w-full h-full text-xs',
                                isActive
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : 'text-gray-500 dark:text-gray-400'
                            )
                        }
                        end={item.path === '/'}
                    >
                        <item.icon className="w-5 h-5 mb-1" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
