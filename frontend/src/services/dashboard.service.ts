import api from './api';
import type { DashboardStats, FocusTimeStats, ApiResponse } from '../types';

export const dashboardService = {
    async getStats(): Promise<DashboardStats> {
        const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
        return response.data.data;
    },

    async getFocusTime(): Promise<FocusTimeStats> {
        const response = await api.get<ApiResponse<FocusTimeStats>>('/dashboard/focus-time');
        return response.data.data;
    },
};
