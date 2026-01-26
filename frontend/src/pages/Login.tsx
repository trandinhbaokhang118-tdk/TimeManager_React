import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Clock, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react';
import { Button, Input } from '../components/ui';
import { showToast } from '../components/ui/toast';
import { useAuthStore } from '../store/auth.store';
import api from '../services/api';
import type { AuthResponse, ApiResponse } from '../types';

const loginSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

const phoneSchema = z.object({
    phone: z.string().regex(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số'),
});

const otpSchema = z.object({
    otp: z.string().length(6, 'Mã OTP phải có 6 chữ số'),
});

type LoginForm = z.infer<typeof loginSchema>;
type PhoneForm = z.infer<typeof phoneSchema>;
type OtpForm = z.infer<typeof otpSchema>;
type LoginMethod = 'email' | 'phone';

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
    const [otpSent, setOtpSent] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const { login, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

    // Load theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }, []);

    // If already authenticated, redirect to home
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/app', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const {
        register: registerPhone,
        handleSubmit: handleSubmitPhone,
        formState: { errors: phoneErrors, isSubmitting: isSubmittingPhone },
    } = useForm<PhoneForm>({
        resolver: zodResolver(phoneSchema),
    });

    const {
        register: registerOtp,
        handleSubmit: handleSubmitOtp,
        formState: { errors: otpErrors, isSubmitting: isSubmittingOtp },
    } = useForm<OtpForm>({
        resolver: zodResolver(otpSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        <Input className="text-black dark:text-black placeholder:text-black/60 dark:placeholder:text-black/60" />

        try {
            const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
            const { accessToken, refreshToken, user } = response.data.data;
            login(user, accessToken, refreshToken);
            showToast.success('Đăng nhập thành công', `Chào mừng ${user.name}!`);
            navigate(from, { replace: true });
        } catch (err: unknown) {
            const error = err as { response?: { data?: { error?: { message?: string } } } };
            showToast.error('Đăng nhập thất bại', error.response?.data?.error?.message || 'Vui lòng kiểm tra lại');
        }
    };

    const onPhoneSubmit = async (data: PhoneForm) => {
        try {
            await api.post('/auth/send-otp', { phone: data.phone });
            setPhoneNumber(data.phone);
            setOtpSent(true);
            showToast.success('Mã OTP đã được gửi', 'Vui lòng kiểm tra tin nhắn');
        } catch (err: unknown) {
            const error = err as { response?: { data?: { error?: { message?: string } } } };
            showToast.error('Gửi OTP thất bại', error.response?.data?.error?.message || 'Vui lòng thử lại');
        }
    };

    const onOtpSubmit = async (data: OtpForm) => {
        try {
            const response = await api.post<ApiResponse<AuthResponse>>('/auth/verify-otp', {
                phone: phoneNumber,
                otp: data.otp,
            });
            const { accessToken, refreshToken, user } = response.data.data;
            login(user, accessToken, refreshToken);
            showToast.success('Đăng nhập thành công', `Chào mừng ${user.name}!`);
            navigate(from, { replace: true });
        } catch (err: unknown) {
            const error = err as { response?: { data?: { error?: { message?: string } } } };
            showToast.error('Xác thực thất bại', error.response?.data?.error?.message || 'Mã OTP không đúng');
        }
    };

    const handleSocialLogin = (provider: 'google' | 'facebook') => {
        // Redirect to backend OAuth endpoint
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
    };

    return (
        <div className="min-h-screen flex relative bg-gradient-to-br from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6] dark:from-[#0A1628] dark:via-[#1E3A5F] dark:to-[#8B5CF6]">
            {/* Decorative background elements - visible on all screens */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative z-10">
                <div className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8">
                    <div className="mb-6 md:mb-8">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6] flex items-center justify-center shadow-lg">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">TimeManager</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Chào mừng trở lại</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Đăng nhập để tiếp tục</p>
                    </div>

                    {/* Login Method Tabs */}
                    <div className="flex gap-2 mb-4 md:mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <button
                            type="button"
                            onClick={() => {
                                setLoginMethod('email');
                                setOtpSent(false);
                            }}
                            className={`flex-1 py-2 px-3 md:px-4 rounded-md text-xs md:text-sm font-medium transition-all ${loginMethod === 'email'
                                ? 'border border-2 border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <Mail className="w-4 h-4 inline mr-1.5 text-primary-600" />
                            Email
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setLoginMethod('phone');
                                setOtpSent(false);
                            }}
                            className={`flex-1 py-2 px-3 md:px-4 rounded-md text-xs md:text-sm font-medium transition-all ${loginMethod === 'phone'
                                ? 'border border-2 border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <Phone className="w-4 h-4 inline mr-1.5 text-primary-600" />
                            Số điện thoại
                        </button>
                    </div>

                    {/* Email Login Form */}
                    {loginMethod === 'email' && (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
                            <div>
                                <label className="label text-sm md:text-base pl-2">Email</label>
                                <Input {...register('email')} type="email" placeholder="name@example.com" icon={<Mail className="w-5 h-5" />} error={!!errors.email} />
                                {errors.email && <p className="mt-1.5 text-xs md:text-sm text-red-500">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="label text-sm md:text-base">Mật khẩu</label>
                                <Input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    icon={<Lock className="w-5 h-5" />}
                                    iconRight={
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-gray-600">
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    }
                                    error={!!errors.password}
                                />
                                {errors.password && <p className="mt-1.5 text-xs md:text-sm text-red-500">{errors.password.message}</p>}
                            </div>

                            <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
                                Đăng nhập
                            </Button>
                        </form>
                    )}

                    {/* Phone Login Form */}
                    {loginMethod === 'phone' && !otpSent && (
                        <form onSubmit={handleSubmitPhone(onPhoneSubmit)} className="space-y-5">
                            <div>
                                <label className="label">Số điện thoại</label>
                                <Input
                                    {...registerPhone('phone')}
                                    type="tel"
                                    placeholder="0912345678"
                                    icon={<Phone className="w-5 h-5" />}
                                    error={!!phoneErrors.phone}
                                />
                                {phoneErrors.phone && <p className="mt-1.5 text-sm text-red-500">{phoneErrors.phone.message}</p>}
                            </div>

                            <Button type="submit" className="w-full" size="lg" loading={isSubmittingPhone}>
                                Gửi mã OTP
                            </Button>
                        </form>
                    )}

                    {/* OTP Verification Form */}
                    {loginMethod === 'phone' && otpSent && (
                        <form onSubmit={handleSubmitOtp(onOtpSubmit)} className="space-y-5">
                            <div>
                                <label className="label">Mã OTP</label>
                                <Input
                                    {...registerOtp('otp')}
                                    type="text"
                                    placeholder="123456"
                                    maxLength={6}
                                    error={!!otpErrors.otp}
                                />
                                {otpErrors.otp && <p className="mt-1.5 text-sm text-red-500">{otpErrors.otp.message}</p>}
                                <p className="mt-1.5 text-sm text-gray-500">
                                    Mã OTP đã được gửi đến {phoneNumber}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    size="lg"
                                    onClick={() => setOtpSent(false)}
                                >
                                    Quay lại
                                </Button>
                                <Button type="submit" className="flex-1" size="lg" loading={isSubmittingOtp}>
                                    Xác thực
                                </Button>
                            </div>
                        </form>
                    )}

                    <p className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
                        Chưa có tài khoản? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">Đăng ký</Link>
                    </p>

                    {/* Divider */}
                    <div className="relative my-4 md:my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-xs md:text-sm">
                            <span className="px-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">Hoặc đăng nhập với</span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-2 md:space-y-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full text-sm md:text-base"
                            size="lg"
                            onClick={() => handleSocialLogin('google')}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Đăng nhập với Google
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full text-sm md:text-base"
                            size="lg"
                            onClick={() => handleSocialLogin('facebook')}
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Đăng nhập với Facebook
                        </Button>
                    </div>

                    {/* Demo accounts hint - only on mobile */}
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg lg:hidden">
                        <p className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">
                            <strong>Demo accounts:</strong>
                        </p>
                        <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                            demo@timemanager.com / demo123<br />
                            admin@timemanager.com / admin123
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6] dark:from-[#0A1628] dark:via-[#1E3A5F] dark:to-[#8B5CF6] items-center justify-center p-12 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-lg text-white relative z-10">
                    <h2 className="text-4xl font-bold mb-6">Quản lý thời gian hiệu quả</h2>
                    <p className="text-lg text-white/90 mb-8">Tổ chức công việc và tối ưu hóa năng suất với TimeManager.</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Clock className="w-5 h-5" />
                            </div>
                            <p className="text-white/90">Lên lịch thông minh với AI</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Clock className="w-5 h-5" />
                            </div>
                            <p className="text-white/90">Theo dõi tiến độ realtime</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Clock className="w-5 h-5" />
                            </div>
                            <p className="text-white/90">Tối ưu năng suất làm việc</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
