import { useState } from 'react';
import { Save, Database, Shield, Globe } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { showToast } from '../../components/ui/toast';

export function SystemSettings() {
    const [settings, setSettings] = useState({
        siteName: 'TimeManager',
        siteUrl: 'http://localhost:5173',
        adminEmail: 'admin@timemanager.com',
        maxTasksPerUser: 1000,
        sessionTimeout: 30,
        enableRegistration: true,
        enableEmailNotifications: true,
        enablePushNotifications: false,
        maintenanceMode: false,
    });

    const handleSave = () => {
        showToast.success('Thành công', 'Đã lưu cài đặt hệ thống');
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-[var(--text)]">Cài đặt hệ thống</h1>
                <p className="text-[var(--text-2)] mt-2">Quản lý cấu hình và tùy chọn hệ thống</p>
            </div>

            {/* General Settings */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Globe className="w-6 h-6 text-primary-600" />
                    <h2 className="text-xl font-bold text-[var(--text)]">Cài đặt chung</h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="label">Tên website</label>
                        <Input
                            value={settings.siteName}
                            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label">URL website</label>
                        <Input
                            value={settings.siteUrl}
                            onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label">Email admin</label>
                        <Input
                            type="email"
                            value={settings.adminEmail}
                            onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* System Limits */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Database className="w-6 h-6 text-primary-600" />
                    <h2 className="text-xl font-bold text-[var(--text)]">Giới hạn hệ thống</h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="label">Số công việc tối đa mỗi người dùng</label>
                        <Input
                            type="number"
                            value={settings.maxTasksPerUser}
                            onChange={(e) => setSettings({ ...settings, maxTasksPerUser: parseInt(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="label">Thời gian timeout phiên (phút)</label>
                        <Input
                            type="number"
                            value={settings.sessionTimeout}
                            onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                        />
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-primary-600" />
                    <h2 className="text-xl font-bold text-[var(--text)]">Tính năng</h2>
                </div>
                <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 rounded-lg hover:bg-[var(--surface-2)] cursor-pointer">
                        <div>
                            <p className="font-medium text-[var(--text)]">Cho phép đăng ký</p>
                            <p className="text-sm text-[var(--text-3)]">Người dùng mới có thể tự đăng ký tài khoản</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.enableRegistration}
                            onChange={(e) => setSettings({ ...settings, enableRegistration: e.target.checked })}
                            className="w-5 h-5"
                        />
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-lg hover:bg-[var(--surface-2)] cursor-pointer">
                        <div>
                            <p className="font-medium text-[var(--text)]">Thông báo email</p>
                            <p className="text-sm text-[var(--text-3)]">Gửi thông báo qua email</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.enableEmailNotifications}
                            onChange={(e) => setSettings({ ...settings, enableEmailNotifications: e.target.checked })}
                            className="w-5 h-5"
                        />
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-lg hover:bg-[var(--surface-2)] cursor-pointer">
                        <div>
                            <p className="font-medium text-[var(--text)]">Push notifications</p>
                            <p className="text-sm text-[var(--text-3)]">Thông báo đẩy trên trình duyệt</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.enablePushNotifications}
                            onChange={(e) => setSettings({ ...settings, enablePushNotifications: e.target.checked })}
                            className="w-5 h-5"
                        />
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-lg hover:bg-[var(--surface-2)] cursor-pointer border-2 border-red-200 dark:border-red-900">
                        <div>
                            <p className="font-medium text-red-600">Chế độ bảo trì</p>
                            <p className="text-sm text-[var(--text-3)]">Tạm khóa hệ thống cho người dùng</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.maintenanceMode}
                            onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                            className="w-5 h-5"
                        />
                    </label>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button size="lg" onClick={handleSave}>
                    <Save className="w-5 h-5 mr-2" />
                    Lưu cài đặt
                </Button>
            </div>
        </div>
    );
}
