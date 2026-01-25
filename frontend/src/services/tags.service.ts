import api from './api';
import type { Tag, CreateTagRequest, ApiResponse } from '../types';

export const tagsService = {
    async getAll(): Promise<Tag[]> {
        const response = await api.get<ApiResponse<Tag[]>>('/tags');
        return response.data.data;
    },

    async create(data: CreateTagRequest): Promise<Tag> {
        const response = await api.post<ApiResponse<Tag>>('/tags', data);
        return response.data.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/tags/${id}`);
    },
};
