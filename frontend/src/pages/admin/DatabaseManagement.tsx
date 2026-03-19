import { Download, Upload, Trash2, RefreshCw, AlertTriangle, Database, Table, FileText, Clock, Zap, Shield } from 'lucide-react';
import '../../admin-theme.css';
import { Button } from '../../components/ui';
import { showToast } from '../../components/ui/toast';

export function DatabaseManagement() {
    const stats = {
        totalSize: '245 MB',
        tables: 12,
        records: 15420,
        lastBackup: '2 giờ trước',
    };

    const handleBackup = () => {
        showToast.success('Thành công', 'Đang tạo bản sao lưu...');
    };

    const handleRestore = () => {
        if (!confirm('Bạn có chắc muốn khôi phục database? Dữ liệu hiện tại sẽ bị ghi đè.')) return;
        showToast.success('Thành công', 'Đang khôi phục database...');
    };

    const handleOptimize = () => {
        showToast.success('Thành công', 'Đang tối ưu hóa database...');
    };

    const handleClearCache = () => {
        showToast.success('Thành công', 'Đã xóa cache');
    };

    const statCards = [
        { label: 'Dung lượng', value: stats.totalSize, icon: Database, iconColor1: '#00E5FF', iconColor2: '#0A84FF', iconShadow: '#00E5FF' },
        { label: 'Bảng', value: stats.tables, icon: Table, iconColor1: '#8B5CF6', iconColor2: '#EC4899', iconShadow: '#8B5CF6' },
        { label: 'Bản ghi', value: stats.records.toLocaleString(), icon: FileText, iconColor1: '#22C55E', iconColor2: '#10B981', iconShadow: '#22C55E' },
        { label: 'Backup cuối', value: stats.lastBackup, icon: Clock, iconColor1: '#F59E0B', iconColor2: '#EF4444', iconShadow: '#F59E0B' },
    ];

    return (
        <div className="admin-theme admin-container p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="admin-title mb-2">
                    Quản lý Database
                </h1>
                <p className="admin-title-sub">Sao lưu, khôi phục và tối ưu hóa database</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="admin-stat-card"
                        style={{ '--icon-color-1': stat.iconColor1, '--icon-color-2': stat.iconColor2, '--icon-shadow': stat.iconShadow } as React.CSSProperties}
                    >
                        <div className="stat-icon">
                            <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="stat-title">{stat.label}</p>
                        <p className="stat-value">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Backup & Restore */}
            <div className="admin-glass-card p-6 mb-6">
                <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Sao lưu & Khôi phục
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                        size="lg"
                        onClick={handleBackup}
                        className="admin-btn admin-btn-primary"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Tạo bản sao lưu
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleRestore}
                        className="admin-btn admin-btn-secondary"
                    >
                        <Upload className="w-5 h-5 mr-2" />
                        Khôi phục từ file
                    </Button>
                </div>
            </div>

            {/* Maintenance */}
            <div className="admin-glass-card p-6 mb-6">
                <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Bảo trì
                </h2>
                <div className="space-y-3">
                    <Button
                        variant="outline"
                        className="admin-btn admin-btn-secondary w-full justify-start"
                        onClick={handleOptimize}
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Tối ưu hóa database
                    </Button>
                    <Button
                        variant="outline"
                        className="admin-btn admin-btn-secondary w-full justify-start"
                        onClick={handleClearCache}
                    >
                        <Trash2 className="w-5 h-5 mr-2" />
                        Xóa cache
                    </Button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-2xl border border-red-500/30 bg-[rgba(239,68,68,0.05)] backdrop-blur-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg md:text-xl font-bold mb-2" style={{ color: 'var(--admin-neon-red)' }}>Vùng nguy hiểm</h2>
                        <p className="text-sm">
                            Các thao tác này không thể hoàn tác. Hãy chắc chắn bạn biết mình đang làm gì.
                        </p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="admin-btn admin-btn-danger"
                >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Xóa toàn bộ dữ liệu
                </Button>
            </div>
        </div>
    );
}
