import * as React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './dialog';
import { Button } from './button';
import { AlertTriangle, Trash2, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    loading?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    variant = 'danger',
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    const icons = {
        danger: <Trash2 className="w-6 h-6 text-red-500" />,
        warning: <AlertTriangle className="w-6 h-6 text-amber-500" />,
        info: <Info className="w-6 h-6 text-blue-500" />,
    };

    const iconBg = {
        danger: 'bg-red-100 dark:bg-red-900/30',
        warning: 'bg-amber-100 dark:bg-amber-900/30',
        info: 'bg-blue-100 dark:bg-blue-900/30',
    };

    const buttonVariant = {
        danger: 'destructive' as const,
        warning: 'default' as const,
        info: 'default' as const,
    };

    const handleCancel = () => {
        onCancel?.();
        onOpenChange(false);
    };

    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-start gap-4">
                        <div className={cn('p-3 rounded-full', iconBg[variant])}>
                            {icons[variant]}
                        </div>
                        <div className="flex-1">
                            <DialogTitle>{title}</DialogTitle>
                            {description && (
                                <DialogDescription className="mt-2">
                                    {description}
                                </DialogDescription>
                            )}
                        </div>
                    </div>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={handleCancel} disabled={loading}>
                        {cancelText}
                    </Button>
                    <Button
                        variant={buttonVariant[variant]}
                        onClick={handleConfirm}
                        loading={loading}
                    >
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Hook for easier usage
interface UseConfirmOptions {
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}

export function useConfirm() {
    const [state, setState] = React.useState<{
        open: boolean;
        options: UseConfirmOptions;
        resolve: ((value: boolean) => void) | null;
    }>({
        open: false,
        options: { title: '' },
        resolve: null,
    });

    const confirm = React.useCallback((options: UseConfirmOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            setState({ open: true, options, resolve });
        });
    }, []);

    const handleConfirm = React.useCallback(() => {
        state.resolve?.(true);
        setState((prev) => ({ ...prev, open: false }));
    }, [state.resolve]);

    const handleCancel = React.useCallback(() => {
        state.resolve?.(false);
        setState((prev) => ({ ...prev, open: false }));
    }, [state.resolve]);

    const ConfirmDialogComponent = React.useCallback(
        () => (
            <ConfirmDialog
                open={state.open}
                onOpenChange={(open) => {
                    if (!open) handleCancel();
                }}
                title={state.options.title}
                description={state.options.description}
                confirmText={state.options.confirmText}
                cancelText={state.options.cancelText}
                variant={state.options.variant}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        ),
        [state.open, state.options, handleConfirm, handleCancel]
    );

    return { confirm, ConfirmDialog: ConfirmDialogComponent };
}
