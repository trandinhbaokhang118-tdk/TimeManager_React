import { useState, useEffect } from 'react';
import { Search, UserPlus, Edit, Trash2, Shield } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { showToast } from '../../components/ui/toast';
import api from '../../services/api';

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
    updatedAt: string;
}

export function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data.data);
        } catch (error) {
            showToast.error('Lỗi', 'Không thể tải danh sách người dùng');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Bạn có chắc muốn xóa người dùng này?')) return;

        try {
            await api.delete(`/admin/users/${userId}`);
            setUsers(users.filter((u) => u.id !== userId));
            showToast.success('Thành công', 'Đã xóa người dùng');
        } catch (error) {
            showToast.error('Lỗi', 'Không thể xóa người dùng');
        }
    };

    const handleToggleRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';

        try {
            await api.patch(`/admin/users/${userId}/role`, { role: newRole });
            setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole as 'USER' | 'ADMIN' } : u)));
            showToast.success('Thành công', `Đã cập nhật quyền thành ${newRole}`);
        } catch (error) {
            showToast.error('Lỗi', 'Không thể cập nhật quyền');
        }
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text)]">Quản lý người dùng</h1>
                    <p className="text-[var(--text-2)] mt-2">{users.length} người dùng trong hệ thống</p>
                </div>
                <Button>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Thêm người dùng
                </Button>
            </div>

            {/* Search */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-4">
                <Input
                    placeholder="Tìm kiếm theo tên hoặc email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search className="w-5 h-5" />}
                />
            </div>

            {/* Users Table */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[var(--surface-2)] border-b border-[var(--border)]">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text)]">Người dùng</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text)]">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text)]">Số điện thoại</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text)]">Quyền</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text)]">Ngày tạo</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-[var(--text)]">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-[var(--surface-2)] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                                                <span className="text-sm font-medium text-primary-600">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-[var(--text)]">{user.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-2)]">{user.email}</td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-2)]">{user.phone || '-'}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'ADMIN'
                                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                                                }`}
                                        >
                                            {user.role === 'ADMIN' ? 'Admin' : 'User'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-2)]">
                                        {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleToggleRole(user.id, user.role)}
                                            >
                                                <Shield className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
