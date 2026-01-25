import api from './api';
import type { Notification, ApiResponse, PaginationMeta } from '../types';

export const notificationsService = {
    async getAll(page = 1, limit = 10): Promise<{ data: Notification[]; meta: PaginationMeta }> {
        const response = await api.get<ApiResponse<Notification[]>>('/notifications', {
            params: { page, limit },
        });
        return response.data as { data: Notification[]; meta: PaginationMeta };
    },

    async getUnreadCount(): Promise<number> {
        const response = await api.get<ApiResponse<{ count: number }>>('/notifications/unread-count');
        return response.data.data.count;
    },

    async markAsRead(id: string): Promise<Notification> {
        const response = await api.patch<ApiResponse<Notification>>(`/notifications/${id}/read`);
        return response.data.data;
    },

    async markAllAsRead(): Promise<void> {
        await api.patch('/notifications/read-all');
    },
};
