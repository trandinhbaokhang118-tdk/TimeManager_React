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
                        <div className="pointer-events-none absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-[var(--text-3)]">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            'flex h-12 w-full rounded-xl border px-4 py-2 text-sm md:text-base',
                            'bg-[var(--input-bg)] border-[color:var(--input-border)] text-[var(--input-text)]',
                            'placeholder:text-[var(--input-placeholder)]',
                            'focus:outline-none focus:border-[color:var(--border-focus)]',
                            'focus:ring-2 focus:ring-[color:var(--ring-color)]',
                            'hover:border-[color:var(--input-border-hover)]',
                            hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                            'transition-all duration-200',
                            icon && 'pl-12',
                            iconRight && 'pr-12',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {iconRight && (
                        <div className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-[var(--text-3)]">
                            {iconRight}
                        </div>
                    )}
                </div>
                {errorMessage && (
                    <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
