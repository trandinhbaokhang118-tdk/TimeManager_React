import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Search, MoreVertical, Edit, Trash2, CheckCircle, X, Sparkles } from 'lucide-react';
import { Button, Input, Badge, StatusBadge, PriorityBadge, SkeletonList, EmptyTasks, ErrorState } from '../components/ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ConfirmDialog } from '../components/ui/confirm-dialog';
import { AIScheduleModal } from '../components/ai-schedule/AIScheduleModal';
import { showToast } from '../components/ui/toast';
import { tasksService } from '../services/tasks.service';
import { cn, formatDate, isOverdue } from '../lib/utils';
import { DateTimePicker } from '../components/ui/DateTimePicker';
import type { Task, TaskStatus, TaskPriority, CreateTaskRequest } from '../types';

const taskSchema = z.object({
    title: z.string().min(1, 'Tiêu đề không được để trống'),
    description: z.string().optional(),
    status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    startAt: z.string().min(1, 'Vui lòng chọn thời gian bắt đầu'),
    dueAt: z.string().min(1, 'Vui lòng chọn thời gian kết thúc'),
    reminderMinutes: z.number().min(5).max(1440).optional(),
}).refine((data) => {
    // dueAt must be after startAt
    return new Date(data.dueAt) > new Date(data.startAt);
}, {
    message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
    path: ['dueAt'],
});

type TaskForm = z.infer<typeof taskSchema>;

export function Tasks() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deleteTask, setDeleteTask] = useState<Task | null>(null);

    const { data: tasksData, isLoading, isError, refetch } = useQuery({
        queryKey: ['tasks', { search, status: statusFilter, priority: priorityFilter }],
        queryFn: () => tasksService.getAll({
            search: search || undefined,
            status: statusFilter !== 'all' ? statusFilter as TaskStatus : undefined,
            priority: priorityFilter !== 'all' ? priorityFilter as TaskPriority : undefined,
        }),
    });

    const createMutation = useMutation({
        mutationFn: tasksService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            showToast.success('Tạo công việc thành công');
            closeModal();
        },
        onError: () => showToast.error('Không thể tạo công việc'),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<CreateTaskRequest> }) =>
            tasksService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            showToast.success('Cập nhật thành công');
            closeModal();
        },
        onError: () => showToast.error('Không thể cập nhật'),
    });

    const deleteMutation = useMutation({
        mutationFn: tasksService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            showToast.success('Đã xóa công việc');
            setDeleteTask(null);
        },
        onError: () => showToast.error('Không thể xóa'),
    });

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<TaskForm>({
        resolver: zodResolver(taskSchema),
        defaultValues: { status: 'TODO', priority: 'MEDIUM' },
    });

    const openCreateModal = () => {
        setEditingTask(null);
        reset({ status: 'TODO', priority: 'MEDIUM', title: '', description: '', dueAt: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (task: Task) => {
        setEditingTask(task);
        reset({
            title: task.title,
            description: task.description || '',
            status: task.status,
            priority: task.priority,
            startAt: task.startAt ? new Date(task.startAt).toISOString().slice(0, 16) : '',
            dueAt: task.dueAt ? new Date(task.dueAt).toISOString().slice(0, 16) : '',
            reminderMinutes: task.reminderMinutes || 15,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
        reset({ status: 'TODO', priority: 'MEDIUM', reminderMinutes: 15 });
    };

    const onSubmit = (data: TaskForm) => {
        const payload: CreateTaskRequest = {
            ...data,
            startAt: new Date(data.startAt).toISOString(),
            dueAt: new Date(data.dueAt).toISOString(),
            reminderMinutes: data.reminderMinutes || 15,
        };
        if (editingTask) {
            updateMutation.mutate({ id: editingTask.id, data: payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    const markAsDone = (task: Task) => {
        updateMutation.mutate({ id: task.id, data: { status: 'DONE' } });
    };

    const hasFilters = statusFilter !== 'all' || priorityFilter !== 'all' || search;

    return (
        <div className="space-y-6 pb-20 md:pb-0 ">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Công việc</h1>
                    <p className="text-gray-500 dark:text-gray-400">Quản lý và theo dõi công việc của bạn</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setIsAIModalOpen(true)}
                        className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700"
                    >
                        <Sparkles className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                        <span className="text-purple-700 dark:text-purple-300">Sắp xếp bằng AI</span>
                    </Button>
                    <Button onClick={openCreateModal}>
                        <Plus className="w-4 h-4 mr-2 dark: text-white" />
                        Tạo mới
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] shadow-[var(--shadow-md)] rounded-xl backdrop-blur-xl p-4 dark:text-gray-900">
                <div className="flex flex-col sm:flex-row gap-3 bg-gray-100">
                    <div className="flex-1">
                        <Input
                            placeholder="Tìm kiếm công việc..."
                            icon={
                                <div className="w-5 h-5 justify-center">
                                    <Search className="w-4 h-4 text-gray-700" strokeWidth={2} />
                                </div>
                            }
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="text-gray-900 placeholder:text-gray-400"
                        />
                    </div>
                    <div className="flex gap-2 ">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[140px] bg-gray-100 dark:hover:bg-blue">
                                <SelectValue placeholder="Trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem className='bg-gray-100' value="all">Tất cả</SelectItem>
                                <SelectItem value="TODO">Chưa làm</SelectItem>
                                <SelectItem value="IN_PROGRESS">Đang làm</SelectItem>
                                <SelectItem value="DONE">Hoàn thành</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={priorityFilter} onValueChange={setPriorityFilter} >
                            <SelectTrigger className="w-[140px] bg-gray-100">
                                <SelectValue placeholder="Độ ưu tiên" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                <SelectItem value="HIGH">Cao</SelectItem>
                                <SelectItem value="MEDIUM">Trung bình</SelectItem>
                                <SelectItem value="LOW">Thấp</SelectItem>
                            </SelectContent>
                        </Select>
                        {hasFilters && (
                            <Button variant="ghost" size="icon" onClick={() => { setSearch(''); setStatusFilter('all'); setPriorityFilter('all'); }}>
                                <X className="w-4 h-4 " />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Task List */}
            {isLoading ? (
                <SkeletonList count={5} />
            ) : isError ? (
                <ErrorState onRetry={refetch} />
            ) : tasksData?.data.length === 0 ? (
                <EmptyTasks onAdd={openCreateModal} />
            ) : (
                <div className="space-y-3">
                    {tasksData?.data.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={() => openEditModal(task)}
                            onDelete={() => setDeleteTask(task)}
                            onMarkDone={() => markAsDone(task)}
                        />
                    ))}
                </div>
            )}

            {/* Create/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingTask ? 'Chỉnh sửa công việc' : 'Tạo công việc mới'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="label">Tiêu đề</label>
                            <Input {...register('title')} placeholder="Nhập tiêu đề" error={!!errors.title} />
                            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                        </div>
                        <div>
                            <label className="label">Mô tả</label>
                            <textarea {...register('description')} className="input min-h-[100px] resize-none" placeholder="Mô tả (tùy chọn)" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Trạng thái</label>
                                <Select value={watch('status')} onValueChange={(v) => setValue('status', v as TaskStatus)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="TODO">Chưa làm</SelectItem>
                                        <SelectItem value="IN_PROGRESS">Đang làm</SelectItem>
                                        <SelectItem value="DONE">Hoàn thành</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="label">Độ ưu tiên</label>
                                <Select value={watch('priority')} onValueChange={(v) => setValue('priority', v as TaskPriority)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="HIGH">Cao</SelectItem>
                                        <SelectItem value="MEDIUM">Trung bình</SelectItem>
                                        <SelectItem value="LOW">Thấp</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <DateTimePicker
                                    label={<>Thời gian bắt đầu <span className="text-red-500">*</span></>}
                                    value={watch('startAt') ? new Date(watch('startAt')) : undefined}
                                    onChange={(date) => setValue('startAt', date.toISOString())}
                                />
                                {errors.startAt && <p className="mt-1 text-sm text-red-500">{errors.startAt.message}</p>}
                            </div>
                            <div>
                                <DateTimePicker
                                    label={<>Thời gian kết thúc <span className="text-red-500">*</span></>}
                                    value={watch('dueAt') ? new Date(watch('dueAt')) : undefined}
                                    onChange={(date) => setValue('dueAt', date.toISOString())}
                                />
                                {errors.dueAt && <p className="mt-1 text-sm text-red-500">{errors.dueAt.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="label">Nhắc trước (phút)</label>
                            <Select
                                value={watch('reminderMinutes')?.toString() || '15'}
                                onValueChange={(v) => setValue('reminderMinutes', parseInt(v))}
                            >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5 phút</SelectItem>
                                    <SelectItem value="10">10 phút</SelectItem>
                                    <SelectItem value="15">15 phút</SelectItem>
                                    <SelectItem value="30">30 phút</SelectItem>
                                    <SelectItem value="60">1 giờ</SelectItem>
                                    <SelectItem value="120">2 giờ</SelectItem>
                                    <SelectItem value="1440">1 ngày</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Hệ thống sẽ gửi thông báo nhắc nhở trước khi công việc bắt đầu
                            </p>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeModal}>Hủy</Button>
                            <Button type="submit" loading={createMutation.isPending || updateMutation.isPending}>
                                {editingTask ? 'Cập nhật' : 'Tạo'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={!!deleteTask}
                onOpenChange={() => setDeleteTask(null)}
                title="Xóa công việc"
                description={`Bạn có chắc muốn xóa "${deleteTask?.title}"? Hành động này không thể hoàn tác.`}
                confirmText="Xóa"
                variant="danger"
                loading={deleteMutation.isPending}
                onConfirm={() => deleteTask && deleteMutation.mutate(deleteTask.id)}
            />

            {/* AI Schedule Modal */}
            <AIScheduleModal
                open={isAIModalOpen}
                onOpenChange={setIsAIModalOpen}
            />
        </div>
    );
}

// Task Card Component
function TaskCard({ task, onEdit, onDelete, onMarkDone }: { task: Task; onEdit: () => void; onDelete: () => void; onMarkDone: () => void }) {
    const overdue = task.status !== 'DONE' && isOverdue(task.dueAt);

    return (
        <div className={cn('card p-4 transition-all hover:shadow-md', overdue && 'border-red-200 dark:border-red-800')}>
            <div className="flex items-start gap-4">
                <button
                    onClick={task.status !== 'DONE' ? onMarkDone : undefined}
                    className={cn(
                        'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors',
                        task.status === 'DONE' ? 'bg-green-500 border-green-500' : overdue ? 'border-red-500 hover:bg-red-50' : 'border-gray-300 hover:border-primary-500'
                    )}
                >
                    {task.status === 'DONE' && <CheckCircle className="w-full h-full text-white p-0.5" />}
                </button>
                <div className="flex-1 min-w-0">
                    <h3 className={cn('font-medium', task.status === 'DONE' ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white')}>
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{task.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <StatusBadge status={task.status} />
                        <PriorityBadge priority={task.priority} />
                        {task.startAt && (
                            <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Bắt đầu: {formatDate(task.startAt, { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        )}
                        {task.dueAt && (
                            <span className={cn('text-xs', overdue ? 'text-red-500 font-medium' : 'text-gray-500 dark:text-gray-400')}>
                                {overdue ? '⚠️ ' : '📅 '}
                                Hạn: {formatDate(task.dueAt, { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        )}
                        {task.tags?.map((tag) => (
                            <Badge key={tag.id} style={{ backgroundColor: tag.color }} className="text-white text-xs">
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm"><MoreVertical className="w-4 h-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {task.status !== 'DONE' && (
                            <DropdownMenuItem onClick={onMarkDone}>
                                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />Hoàn thành
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={onEdit}><Edit className="w-4 h-4 mr-2" />Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete} className="text-red-600"><Trash2 className="w-4 h-4 mr-2" />Xóa</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
