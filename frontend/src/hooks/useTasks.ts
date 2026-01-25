import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { showToast } from '../components/ui/toast';
import type { Task, ApiResponse } from '../types';

export function useTasksQuery() {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await api.get<ApiResponse<Task[]>>('/tasks');
            return response.data;
        },
    });
}

export function useUpdateTaskMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<Task> }) => {
            const response = await api.patch<ApiResponse<Task>>(`/tasks/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: () => {
            showToast.error('Lỗi', 'Không thể cập nhật công việc');
        },
    });
}
