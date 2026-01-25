import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-gradient-to-r from-[#12C2FF] via-[#5A7D9A] to-[#FF69B4] text-black dark:text-white shadow-md hover:shadow-lg brightness-110 hover:brightness-100 dark:shadow-[0_0_20px_rgba(18,194,255,0.3)] dark:hover:shadow-[0_0_30px_rgba(18,194,255,0.4)] focus-visible:ring-[#12C2FF]',
                destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800',
                outline: 'bg-gradient-to-r from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6] text-white shadow-md hover:shadow-lg brightness-110 hover:brightness-100 dark:shadow-[0_0_20px_rgba(18,194,255,0.3)] dark:hover:shadow-[0_0_30px_rgba(18,194,255,0.4)] focus-visible:ring-[#12C2FF]',
                secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-900 hover:bg-gray-200 dark:hover:bg-blue-700',
                ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-900',
                link: 'text-primary-600 underline-offset-4 hover:underline',
                success: 'bg-green-600 text-white shadow-sm hover:bg-green-700 active:bg-green-800',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-8 px-3 text-xs',
                lg: 'h-12 px-6 text-base',
                icon: 'h-10 w-10',
                'icon-sm': 'h-8 w-8',
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

        // When using asChild, we can't add loading spinner as it would create multiple children
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
