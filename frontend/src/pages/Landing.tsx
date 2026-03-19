import { Link } from 'react-router-dom';
import { Clock, CheckCircle, Calendar, Timer, Sparkles, TrendingUp, Shield, ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '../components/ui';
import { useState, useEffect } from 'react';

export function Landing() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: CheckCircle,
            title: 'Quản lý Công việc',
            description: 'Tạo, sắp xếp và theo dõi tasks với giao diện trực quan. Drag & drop dễ dàng.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Calendar,
            title: 'Lịch Thông minh',
            description: 'Time blocking và calendar view giúp bạn lên kế hoạch hiệu quả.',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: Timer,
            title: 'Focus Mode',
            description: 'Pomodoro timer giúp tập trung làm việc và tăng năng suất.',
            color: 'from-orange-500 to-red-500'
        },
        {
            icon: Sparkles,
            title: 'AI Assistant',
            description: 'Chatbot AI hỗ trợ 24/7, tự động sắp xếp lịch thông minh.',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: TrendingUp,
            title: 'Thống kê & Báo cáo',
            description: 'Theo dõi năng suất với biểu đồ và analytics chi tiết.',
            color: 'from-indigo-500 to-blue-500'
        },
        {
            icon: Shield,
            title: 'Bảo mật Cao',
            description: 'JWT authentication, OAuth2, mã hóa dữ liệu an toàn.',
            color: 'from-red-500 to-pink-500'
        }
    ];

    const stats = [
        { value: '10K+', label: 'Người dùng' },
        { value: '50K+', label: 'Tasks hoàn thành' },
        { value: '99.9%', label: 'Uptime' },
        { value: '4.9/5', label: 'Đánh giá' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-[#050A14] dark:via-[#0A1628] dark:to-[#0F1520]">
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg'
                : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6] flex items-center justify-center">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">TimeManager</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <a
                                href="#features"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                            >
                                Tính năng
                            </a>
                            <a
                                href="#download"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                            >
                                Tải ứng dụng
                            </a>
                            <a
                                href="#about"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                            >
                                Về chúng tôi
                            </a>
                            <Link to="/login">
                                <Button variant="ghost">Đăng nhập</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Dùng thử miễn phí</Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                        <div className="px-4 py-4 space-y-3">
                            <a
                                href="#features"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMobileMenuOpen(false);
                                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="block py-2 text-gray-600 dark:text-gray-300 cursor-pointer"
                            >
                                Tính năng
                            </a>
                            <a
                                href="#download"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMobileMenuOpen(false);
                                    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="block py-2 text-gray-600 dark:text-gray-300 cursor-pointer"
                            >
                                Tải ứng dụng
                            </a>
                            <a
                                href="#about"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMobileMenuOpen(false);
                                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="block py-2 text-gray-600 dark:text-gray-300 cursor-pointer"
                            >
                                Về chúng tôi
                            </a>
                            <Link to="/login" className="block">
                                <Button variant="ghost" className="w-full">Đăng nhập</Button>
                            </Link>
                            <Link to="/register" className="block">
                                <Button className="w-full">Dùng thử miễn phí</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                            Quản lý thời gian
                            <span className="block bg-gradient-to-r from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                                thông minh với AI
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Tăng năng suất làm việc với công cụ quản lý thời gian hiện đại.
                            AI Assistant, Pomodoro Timer, và nhiều tính năng mạnh mẽ khác.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register">
                                <Button size="lg" className="text-lg px-8">
                                    Bắt đầu miễn phí
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => {
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                            }}>
                                Xem Demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Tính năng nổi bật
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Mọi công cụ bạn cần để quản lý thời gian hiệu quả
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-white dark:bg-[#1A2942] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-blue-900/50"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0A1628]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Tải ứng dụng ngay
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Sử dụng trên mọi nền tảng - Web, iOS, Android
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {/* Web App */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-[#1A2942] dark:to-[#0F1520] rounded-2xl p-8 text-center border-2 border-blue-200 dark:border-blue-900">
                            <div className="w-16 h-16 bg-gradient-to-r from-[#12C2FF] to-[#3B82F6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Web App</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                                Sử dụng ngay trên trình duyệt
                            </p>
                            <Link to="/app">
                                <Button className="w-full">Mở Web App</Button>
                            </Link>
                        </div>

                        {/* iOS App */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1A2942] dark:to-[#0F1520] rounded-2xl p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">iOS App</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                                Sắp ra mắt trên App Store
                            </p>
                            <Button variant="outline" className="w-full" disabled>
                                Sắp có
                            </Button>
                        </div>

                        {/* Android App */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1A2942] dark:to-[#0F1520] rounded-2xl p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 0 0-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C4.8 10.85 3.5 12.62 3.5 14.5h17c0-1.88-1.3-3.65-2.9-5.02zM10 12.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm4 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Android App</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                                Sắp ra mắt trên Play Store
                            </p>
                            <Button variant="outline" className="w-full" disabled>
                                Sắp có
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6] rounded-3xl p-12 text-center shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Sẵn sàng tăng năng suất?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Tham gia cùng hàng nghìn người dùng đang quản lý thời gian hiệu quả
                        </p>
                        <Link to="/register">
                            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 border-0 text-lg px-8">
                                Bắt đầu ngay - Miễn phí
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="about" className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#12C2FF] to-[#8B5CF6] flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-bold text-gray-900 dark:text-white">TimeManager</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Quản lý thời gian thông minh với AI
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Sản phẩm</h4>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li><a href="#" className="hover:text-blue-600">Tính năng</a></li>
                                <li><a href="#" className="hover:text-blue-600">Giá cả</a></li>
                                <li><a href="#" className="hover:text-blue-600">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Công ty</h4>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li><a href="#" className="hover:text-blue-600">Về chúng tôi</a></li>
                                <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                                <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Hỗ trợ</h4>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li><a href="#" className="hover:text-blue-600">Trung tâm trợ giúp</a></li>
                                <li><a href="#" className="hover:text-blue-600">Liên hệ</a></li>
                                <li><a href="#" className="hover:text-blue-600">Điều khoản</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        © 2026 TimeManager. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
