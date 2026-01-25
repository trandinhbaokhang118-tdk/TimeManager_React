import api from './api';
import type { Reminder, CreateReminderRequest, ApiResponse } from '../types';

export const remindersService = {
    async getAll(): Promise<Reminder[]> {
        const response = await api.get<ApiResponse<Reminder[]>>('/reminders');
        return response.data.data;
    },

    async create(data: CreateReminderRequest): Promise<Reminder> {
        const response = await api.post<ApiResponse<Reminder>>('/reminders', data);
        return response.data.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/reminders/${id}`);
    },
};
