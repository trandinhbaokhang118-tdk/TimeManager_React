import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { showToast } from '../components/ui/toast';
import api from '../services/api';

export function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuthStore();

    useEffect(() => {
        const handleCallback = async () => {
            const token = searchParams.get('token');

            if (!token) {
                showToast.error('Đăng nhập thất bại', 'Không nhận được token');
                navigate('/login');
                return;
            }

            try {
                // Get user info with the token
                const response = await api.get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const user = response.data.data;
                login(user, token, ''); // No refresh token from OAuth yet

                showToast.success('Đăng nhập thành công', `Chào mừng ${user.name}!`);
                navigate('/app');
            } catch (error) {
                showToast.error('Đăng nhập thất bại', 'Vui lòng thử lại');
                navigate('/login');
            }
        };

        handleCallback();
    }, [searchParams, navigate, login]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Đang xử lý đăng nhập...</p>
            </div>
        </div>
    );
}
