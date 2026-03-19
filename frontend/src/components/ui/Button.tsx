import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-[image:var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-[var(--shadow-md)] hover:bg-[image:var(--btn-primary-bg-hover)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 focus-visible:ring-[color:var(--ring-color)]',

                destructive: 'border-transparent bg-red-500 text-white shadow-[var(--shadow-md)] hover:bg-red-600 hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 focus-visible:ring-red-500',

                outline: 'bg-[var(--btn-outline-bg)] border-[color:var(--btn-outline-border)] text-[var(--btn-outline-text)] hover:bg-[var(--btn-outline-bg-hover)] hover:border-[color:var(--border-hover)] hover:text-[var(--text)]',

                secondary: 'bg-[var(--surface-highlight)] border-[color:var(--surface-highlight-border)] text-[var(--text)] shadow-[var(--shadow-sm)] hover:bg-[var(--surface-3)] hover:-translate-y-0.5',

                ghost: 'border-transparent text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text)]',

                link: 'border-transparent text-[var(--primary)] underline-offset-4 hover:underline',

                success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 focus-visible:ring-emerald-500',

                gradient: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-0.5',
                'gradient-reverse': 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
            },
            size: {
                default: 'h-11 px-5 py-2.5',
                sm: 'h-9 px-3.5 text-xs',
                lg: 'h-12 px-7 text-base',
                xl: 'h-14 px-8 text-lg',
                icon: 'h-11 w-11',
                'icon-sm': 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        if (asChild) {
            return (
                <Comp
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    {...props}
                >
                    {children}
                </Comp>
            );
        }

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading && <Loader2 className="animate-spin" />}
                {children}
            </Comp>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
