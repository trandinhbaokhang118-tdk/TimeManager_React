import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const { isAuthenticated } = useAuthStore();
    const location = useLocation();

    // Check tokens directly from localStorage for immediate response
    const hasTokens = !!localStorage.getItem('accessToken') || !!localStorage.getItem('refreshToken');

    // If not authenticated and no tokens, redirect to login
    if (!isAuthenticated && !hasTokens) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
