import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { AuthCallback } from '../pages/AuthCallback';
import { Dashboard } from '../pages/Dashboard';
import { Tasks } from '../pages/Tasks';
import { Calendar } from '../pages/Calendar';
import { Planner } from '../pages/Planner';
import { Focus } from '../pages/Focus';
import { Analytics } from '../pages/Analytics';
import { Reminders } from '../pages/Reminders';
import { Notifications } from '../pages/Notifications';
import { Settings } from '../pages/Settings';
import { NotFound } from '../pages/NotFound';
import { AppLayout } from '../components/layout';
import { PrivateRoute } from '../components/auth/PrivateRoute';
import { AdminRoute } from '../components/admin/AdminRoute';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { UserManagement } from '../pages/admin/UserManagement';
import { ActivityLogs } from '../pages/admin/ActivityLogs';
import { DatabaseManagement } from '../pages/admin/DatabaseManagement';
import { SystemSettings } from '../pages/admin/SystemSettings';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/auth/callback',
        element: <AuthCallback />,
    },
    {
        path: '/admin',
        element: (
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
        ),
        children: [
            {
                index: true,
                element: <AdminDashboard />,
            },
            {
                path: 'users',
                element: <UserManagement />,
            },
            {
                path: 'activity',
                element: <ActivityLogs />,
            },
            {
                path: 'database',
                element: <DatabaseManagement />,
            },
            {
                path: 'settings',
                element: <SystemSettings />,
            },
        ],
    },
    {
        path: '/app',
        element: (
            <PrivateRoute>
                <AppLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: 'tasks',
                element: <Tasks />,
            },
            {
                path: 'calendar',
                element: <Calendar />,
            },
            {
                path: 'planner',
                element: <Planner />,
            },
            {
                path: 'focus',
                element: <Focus />,
            },
            {
                path: 'analytics',
                element: <Analytics />,
            },
            {
                path: 'reminders',
                element: <Reminders />,
            },
            {
                path: 'notifications',
                element: <Notifications />,
            },
            {
                path: 'settings',
                element: <Settings />,
            },
        ],
    },
    {
        path: '/dashboard',
        element: <Navigate to="/app" replace />,
    },
    {
        path: '/404',
        element: <NotFound />,
    },
    {
        path: '*',
        element: <Navigate to="/404" replace />,
    },
]);
