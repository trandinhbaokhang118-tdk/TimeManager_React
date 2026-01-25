import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../../lib/utils';

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
        indicatorClassName?: string;
    }
>(({ className, value, indicatorClassName, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            'relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800',
            className
        )}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className={cn(
                'h-full w-full flex-1 bg-primary-600 transition-all duration-300 ease-out',
                indicatorClassName
            )}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

// Circular progress
interface CircularProgressProps {
    value: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
    showValue?: boolean;
}

function CircularProgress({
    value,
    size = 120,
    strokeWidth = 8,
    className,
    showValue = true,
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className={cn('relative inline-flex items-center justify-center', className)}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-gray-200 dark:text-gray-800"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="text-primary-600 transition-all duration-500 ease-out"
                />
            </svg>
            {showValue && (
                <span className="absolute text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {Math.round(value)}%
                </span>
            )}
        </div>
    );
}

export { Progress, CircularProgress };
