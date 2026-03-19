import { useState } from 'react';
import { Save, Database, Globe, Settings } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { showToast } from '../../components/ui/toast';
import '../../admin-theme.css';

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
        <div className="admin-theme admin-container p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="admin-title mb-2">
                    Cài đặt hệ thống
                </h1>
                <p className="admin-title-sub">Quản lý cấu hình và tùy chọn hệ thống</p>
            </div>

            {/* General Settings */}
            <div className="admin-glass-card p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                        <Globe className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold">Cài đặt chung</h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Tên website</label>
                        <Input
                            className="admin-input"
                            value={settings.siteName}
                            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">URL website</label>
                        <Input
                            className="admin-input"
                            value={settings.siteUrl}
                            onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email admin</label>
                        <Input
                            className="admin-input"
                            type="email"
                            value={settings.adminEmail}
                            onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* System Limits */}
            <div className="admin-glass-card p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <Database className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold">Giới hạn hệ thống</h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Số công việc tối đa mỗi người dùng</label>
                        <Input
                            className="admin-input"
                            type="number"
                            value={settings.maxTasksPerUser}
                            onChange={(e) => setSettings({ ...settings, maxTasksPerUser: parseInt(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Thời gian timeout phiên (phút)</label>
                        <Input
                            className="admin-input"
                            type="number"
                            value={settings.sessionTimeout}
                            onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                        />
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="admin-glass-card p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                        <Settings className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold">Tính năng</h2>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-200">
                        <div>
                            <p className="font-medium">Cho phép đăng ký</p>
                            <p className="text-sm opacity-70">Người dùng mới có thể tự đăng ký tài khoản</p>
                        </div>
                        <button
                            role="switch"
                            aria-checked={settings.enableRegistration}
                            className={`admin-toggle ${settings.enableRegistration ? 'active' : ''}`}
                            onClick={() => setSettings({ ...settings, enableRegistration: !settings.enableRegistration })}
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-200">
                        <div>
                            <p className="font-medium">Thông báo email</p>
                            <p className="text-sm opacity-70">Gửi thông báo qua email</p>
                        </div>
                        <button
                            role="switch"
                            aria-checked={settings.enableEmailNotifications}
                            className={`admin-toggle ${settings.enableEmailNotifications ? 'active' : ''}`}
                            onClick={() => setSettings({ ...settings, enableEmailNotifications: !settings.enableEmailNotifications })}
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-200">
                        <div>
                            <p className="font-medium">Push notifications</p>
                            <p className="text-sm opacity-70">Thông báo đẩy trên trình duyệt</p>
                        </div>
                        <button
                            role="switch"
                            aria-checked={settings.enablePushNotifications}
                            className={`admin-toggle ${settings.enablePushNotifications ? 'active' : ''}`}
                            onClick={() => setSettings({ ...settings, enablePushNotifications: !settings.enablePushNotifications })}
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 border border-red-500/20">
                        <div>
                            <p className="font-medium" style={{ color: 'var(--admin-neon-red)' }}>Chế độ bảo trì</p>
                            <p className="text-sm opacity-70">Tạm khóa hệ thống cho người dùng</p>
                        </div>
                        <button
                            role="switch"
                            aria-checked={settings.maintenanceMode}
                            className={`admin-toggle ${settings.maintenanceMode ? 'active' : ''}`}
                            onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                        />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button
                    size="lg"
                    onClick={handleSave}
                    className="admin-btn admin-btn-primary"
                >
                    <Save className="w-5 h-5 mr-2" />
                    Lưu cài đặt
                </Button>
            </div>
        </div>
    );
}
