import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

interface AdminRouteProps {
    children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== 'ADMIN') {
        return <Navigate to="/app" replace />;
    }

    return <>{children}</>;
}
