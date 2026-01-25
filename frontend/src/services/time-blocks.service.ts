import api from './api';
import type { TimeBlock, CreateTimeBlockRequest, TimeBlockQueryParams, ApiResponse } from '../types';

export const timeBlocksService = {
    async getAll(params: TimeBlockQueryParams): Promise<TimeBlock[]> {
        const response = await api.get<ApiResponse<TimeBlock[]>>('/time-blocks', { params });
        return response.data.data;
    },

    async getById(id: string): Promise<TimeBlock> {
        const response = await api.get<ApiResponse<TimeBlock>>(`/time-blocks/${id}`);
        return response.data.data;
    },

    async create(data: CreateTimeBlockRequest): Promise<TimeBlock> {
        const response = await api.post<ApiResponse<TimeBlock>>('/time-blocks', data);
        return response.data.data;
    },

    async update(id: string, data: Partial<CreateTimeBlockRequest>): Promise<TimeBlock> {
        const response = await api.patch<ApiResponse<TimeBlock>>(`/time-blocks/${id}`, data);
        return response.data.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/time-blocks/${id}`);
    },
};
