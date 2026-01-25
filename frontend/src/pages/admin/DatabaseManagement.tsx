import { useState } from 'react';
import { Download, Upload, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';
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

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-[var(--text)]">Quản lý Database</h1>
                <p className="text-[var(--text-2)] mt-2">Sao lưu, khôi phục và tối ưu hóa database</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-4">
                    <p className="text-sm text-[var(--text-2)] mb-1">Dung lượng</p>
                    <p className="text-2xl font-bold text-[var(--text)]">{stats.totalSize}</p>
                </div>
                <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-4">
                    <p className="text-sm text-[var(--text-2)] mb-1">Bảng</p>
                    <p className="text-2xl font-bold text-[var(--text)]">{stats.tables}</p>
                </div>
                <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-4">
                    <p className="text-sm text-[var(--text-2)] mb-1">Bản ghi</p>
                    <p className="text-2xl font-bold text-[var(--text)]">{stats.records.toLocaleString()}</p>
                </div>
                <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-4">
                    <p className="text-sm text-[var(--text-2)] mb-1">Backup cuối</p>
                    <p className="text-2xl font-bold text-[var(--text)]">{stats.lastBackup}</p>
                </div>
            </div>

            {/* Backup & Restore */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-6">
                <h2 className="text-xl font-bold text-[var(--text)] mb-4">Sao lưu & Khôi phục</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button size="lg" onClick={handleBackup}>
                        <Download className="w-5 h-5 mr-2" />
                        Tạo bản sao lưu
                    </Button>
                    <Button variant="outline" size="lg" onClick={handleRestore}>
                        <Upload className="w-5 h-5 mr-2" />
                        Khôi phục từ file
                    </Button>
                </div>
            </div>

            {/* Maintenance */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-6">
                <h2 className="text-xl font-bold text-[var(--text)] mb-4">Bảo trì</h2>
                <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" onClick={handleOptimize}>
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Tối ưu hóa database
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleClearCache}>
                        <Trash2 className="w-5 h-5 mr-2" />
                        Xóa cache
                    </Button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-900 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h2 className="text-xl font-bold text-red-600 mb-2">Vùng nguy hiểm</h2>
                        <p className="text-sm text-[var(--text-2)]">
                            Các thao tác này không thể hoàn tác. Hãy chắc chắn bạn biết mình đang làm gì.
                        </p>
                    </div>
                </div>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 className="w-5 h-5 mr-2" />
                    Xóa toàn bộ dữ liệu
                </Button>
            </div>
        </div>
    );
}
