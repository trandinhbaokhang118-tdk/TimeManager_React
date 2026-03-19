import { cn } from '../../lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('animate-pulse rounded-xl skeleton', className)}
            {...props}
        />
    );
}

// Pre-built skeleton components
function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn('card p-4 space-y-3', className)}>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>
        </div>
    );
}

function SkeletonList({ count = 5, className }: { count?: number; className?: string }) {
    return (
        <div className={cn('space-y-3', className)}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function SkeletonTable({ rows = 5, cols = 4, className }: { rows?: number; cols?: number; className?: string }) {
    return (
        <div className={cn('space-y-3', className)}>
            {/* Header */}
            <div className="flex gap-4 border-b border-[color:var(--divider)] p-3">
                {Array.from({ length: cols }).map((_, i) => (
                    <Skeleton key={i} className="h-4 flex-1" />
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4 p-3">
                    {Array.from({ length: cols }).map((_, j) => (
                        <Skeleton key={j} className="h-4 flex-1" />
                    ))}
                </div>
            ))}
        </div>
    );
}

function SkeletonStats({ count = 4, className }: { count?: number; className?: string }) {
    return (
        <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="card p-4 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-8 w-16" />
                </div>
            ))}
        </div>
    );
}

function SkeletonCalendar({ className }: { className?: string }) {
    return (
        <div className={cn('space-y-4', className)}>
            {/* Header */}
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
            </div>
            {/* Days header */}
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} className="h-8" />
                ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-lg" />
                ))}
            </div>
        </div>
    );
}

// Alias for backward compatibility
const ListSkeleton = SkeletonList;

export { Skeleton, SkeletonCard, SkeletonList, ListSkeleton, SkeletonTable, SkeletonStats, SkeletonCalendar };
