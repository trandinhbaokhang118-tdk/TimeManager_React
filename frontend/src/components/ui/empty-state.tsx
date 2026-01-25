import { cn } from '../../lib/utils';
import { Button } from './button';
import {
    FileQuestion,
    AlertCircle,
    SearchX,
    Inbox,
    Calendar,
    CheckCircle2,
    Bell,
    type LucideIcon
} from 'lucide-react';

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

function EmptyState({ icon: Icon = Inbox, title, description, action, className }: EmptyStateProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
            {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-4">{description}</p>
            )}
            {action && (
                <Button onClick={action.onClick} variant="outline" size="sm">
                    {action.label}
                </Button>
            )}
        </div>
    );
}

// Pre-built empty states
function EmptyTasks({ onAdd }: { onAdd?: () => void }) {
    return (
        <EmptyState
            icon={CheckCircle2}
            title="Chưa có công việc nào"
            description="Tạo công việc đầu tiên để bắt đầu quản lý thời gian của bạn"
            action={onAdd ? { label: 'Tạo công việc', onClick: onAdd } : undefined}
        />
    );
}

function EmptyCalendar({ onAdd }: { onAdd?: () => void }) {
    return (
        <EmptyState
            icon={Calendar}
            title="Lịch trống"
            description="Chưa có sự kiện nào trong khoảng thời gian này"
            action={onAdd ? { label: 'Thêm sự kiện', onClick: onAdd } : undefined}
        />
    );
}

function EmptyNotifications() {
    return (
        <EmptyState
            icon={Bell}
            title="Không có thông báo"
            description="Bạn đã xem hết tất cả thông báo"
        />
    );
}

function EmptySearch({ query }: { query?: string }) {
    return (
        <EmptyState
            icon={SearchX}
            title="Không tìm thấy kết quả"
            description={query ? `Không có kết quả nào cho "${query}"` : 'Thử tìm kiếm với từ khóa khác'}
        />
    );
}

// Error state
interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
    className?: string;
}

function ErrorState({
    title = 'Đã xảy ra lỗi',
    description = 'Không thể tải dữ liệu. Vui lòng thử lại.',
    onRetry,
    className
}: ErrorStateProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
            <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-4">{description}</p>
            <div className="flex gap-2">
                {onRetry && (
                    <Button onClick={onRetry} variant="outline" size="sm">
                        Thử lại
                    </Button>
                )}
                <Button
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = '/login';
                    }}
                    variant="ghost"
                    size="sm"
                >
                    Đăng nhập lại
                </Button>
            </div>
        </div>
    );
}

// Not found state
function NotFoundState({ className }: { className?: string }) {
    return (
        <EmptyState
            icon={FileQuestion}
            title="Không tìm thấy trang"
            description="Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa"
            className={className}
        />
    );
}

export {
    EmptyState,
    EmptyTasks,
    EmptyCalendar,
    EmptyNotifications,
    EmptySearch,
    ErrorState,
    NotFoundState
};
