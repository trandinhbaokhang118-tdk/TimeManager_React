import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
                primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300',
                secondary: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
                success: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
                warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
                danger: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
                info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
                outline: 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

// Status Badge
interface StatusBadgeProps {
    status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'OVERDUE';
    className?: string;
}

function StatusBadge({ status, className }: StatusBadgeProps) {
    const labels: Record<string, string> = {
        TODO: 'Chưa làm',
        IN_PROGRESS: 'Đang làm',
        DONE: 'Hoàn thành',
        OVERDUE: 'Quá hạn',
    };

    const variants: Record<string, 'default' | 'info' | 'success' | 'danger'> = {
        TODO: 'default',
        IN_PROGRESS: 'info',
        DONE: 'success',
        OVERDUE: 'danger',
    };

    return (
        <Badge variant={variants[status]} className={className}>
            {labels[status]}
        </Badge>
    );
}

// Priority Badge
interface PriorityBadgeProps {
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    className?: string;
}

function PriorityBadge({ priority, className }: PriorityBadgeProps) {
    const labels: Record<string, string> = {
        LOW: 'Thấp',
        MEDIUM: 'Trung bình',
        HIGH: 'Cao',
    };

    const variants: Record<string, 'success' | 'warning' | 'danger'> = {
        LOW: 'success',
        MEDIUM: 'warning',
        HIGH: 'danger',
    };

    return (
        <Badge variant={variants[priority]} className={className}>
            {labels[priority]}
        </Badge>
    );
}

export { Badge, badgeVariants, StatusBadge, PriorityBadge };
