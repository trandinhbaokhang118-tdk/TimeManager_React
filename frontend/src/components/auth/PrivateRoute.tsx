import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useEffect, useState } from 'react';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Check auth state on mount
        const checkAuth = useAuthStore.getState().checkAuth;
        checkAuth();
        setIsChecking(false);
    }, []); // Empty deps - only run once on mount

    // Show nothing while checking (prevents flash)
    if (isChecking) {
        return null;
    }

    // Check both isAuthenticated flag and user object
    const hasAuth = isAuthenticated && user;
    const hasTokens = !!localStorage.getItem('accessToken') || !!localStorage.getItem('refreshToken');

    if (!hasAuth && !hasTokens) {
        // Redirect to login, preserving the intended destination
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
