import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200',
    {
        variants: {
            variant: {
                default: 'bg-[var(--surface-3)] text-[var(--text-2)] border border-[color:var(--border)]',

                primary: 'bg-[var(--surface-highlight)] text-[var(--primary)] border border-[color:var(--surface-highlight-border)]',

                secondary: 'bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30',

                success: 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30',

                warning: 'bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30',

                danger: 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30',

                info: 'bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30',

                outline: 'border border-[color:var(--border)] text-[var(--text-2)] bg-transparent',
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
