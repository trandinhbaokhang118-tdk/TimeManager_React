// User types
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
    updatedAt: string;
}

// Auth types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

// Task types
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
    id: string;
    userId: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    startAt: string;
    dueAt: string;
    reminderMinutes?: number;
    createdAt: string;
    updatedAt: string;
    tags?: Tag[];
}

export interface CreateTaskRequest {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    startAt: string;
    dueAt: string;
    reminderMinutes?: number;
    tagIds?: string[];
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> { }

// Tag types
export interface Tag {
    id: string;
    userId: string;
    name: string;
    color: string;
    createdAt: string;
}

export interface CreateTagRequest {
    name: string;
    color?: string;
}

// Time Block types
export interface TimeBlock {
    id: string;
    userId: string;
    title: string;
    description?: string;
    startAt: string;
    endAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTimeBlockRequest {
    title: string;
    description?: string;
    startAt: string;
    endAt: string;
}

// Reminder types
export interface Reminder {
    id: string;
    userId: string;
    message: string;
    triggerAt: string;
    triggered: boolean;
    createdAt: string;
}

export interface CreateReminderRequest {
    message: string;
    triggerAt: string;
}

// Notification types
export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    readAt?: string;
    createdAt: string;
}

// Dashboard types
export interface DashboardStats {
    tasksDueToday: number;
    tasksOverdue: number;
    tasksCompletedThisWeek: number;
}

export interface FocusTimeStats {
    totalMinutes: number;
    totalHours: number;
}

// API Response types
export interface ApiResponse<T> {
    data: T;
    meta?: PaginationMeta;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ApiError {
    error: {
        code: string;
        message: string;
        details?: Record<string, unknown>;
    };
}

// Query params
export interface TaskQueryParams {
    page?: number;
    limit?: number;
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: 'dueAt' | 'createdAt' | 'priority';
    sortOrder?: 'asc' | 'desc';
}

export interface TimeBlockQueryParams {
    startDate: string;
    endDate: string;
}
