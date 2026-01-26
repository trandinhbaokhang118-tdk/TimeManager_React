import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string | boolean;
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, icon, iconRight, ...props }, ref) => {
        const hasError = !!error;
        const errorMessage = typeof error === 'string' ? error : undefined;

        return (
            <div className="w-full">
                <div className="relative flex items-center">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none z-10 flex items-center justify-center">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            'flex h-12 w-full rounded-lg border bg-white dark:bg-gray-800 px-3 py-2 text-sm md:text-base',
                            'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white',
                            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                            'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                            'transition-all duration-200',
                            icon && 'pl-11',
                            iconRight && 'pr-11',
                            hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {iconRight && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10 flex items-center justify-center">
                            {iconRight}
                        </div>
                    )}
                </div>
                {errorMessage && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errorMessage}</p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
