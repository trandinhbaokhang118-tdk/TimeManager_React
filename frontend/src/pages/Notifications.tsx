import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, Check, CheckCheck, Clock } from 'lucide-react';
import { Button, Badge, SkeletonList, EmptyNotifications, ErrorState } from '../components/ui';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { useNotificationStore } from '../store/notification.store';
import { notificationsService } from '../services/notifications.service';
import { showToast } from '../components/ui/toast';
import { cn, formatDateTime } from '../lib/utils';
import type { Notification } from '../types';

export function Notifications() {
    const queryClient = useQueryClient();
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();

    const { isLoading, isError, refetch } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => notificationsService.getAll(1, 50),
    });

    const markAsReadMutation = useMutation({
        mutationFn: notificationsService.markAsRead,
        onSuccess: (_, id) => {
            markAsRead(id);
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
        onError: () => showToast.error('Không thể đánh dấu đã đọc'),
    });

    const markAllAsReadMutation = useMutation({
        mutationFn: notificationsService.markAllAsRead,
        onSuccess: () => {
            markAllAsRead();
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            showToast.success('Đã đánh dấu tất cả là đã đọc');
        },
        onError: () => showToast.error('Không thể đánh dấu tất cả'),
    });

    const unreadNotifications = notifications.filter(n => !n.readAt);

    if (isError) {
        return <ErrorState onRetry={refetch} />;
    }

    return (
        <div className="space-y-6 pb-20 md:pb-0">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text)]">Thông báo</h1>
                    <p className="text-[var(--text-2)]">
                        {unreadCount > 0 ? `${unreadCount} thông báo chưa đọc` : 'Bạn đã xem hết thông báo'}
                    </p>
                </div>
                {unreadCount > 0 && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAllAsReadMutation.mutate()}
                        loading={markAllAsReadMutation.isPending}
                    >
                        <CheckCheck className="w-4 h-4 mr-2" />
                        Đánh dấu tất cả
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    <TabsTrigger value="all">
                        Tất cả
                        {notifications.length > 0 && (
                            <Badge variant="secondary" className="ml-2">
                                {notifications.length}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="unread">
                        Chưa đọc
                        {unreadCount > 0 && (
                            <Badge variant="primary" className="ml-2">
                                {unreadCount}
                            </Badge>
                        )}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    {isLoading ? (
                        <SkeletonList count={5} />
                    ) : notifications.length === 0 ? (
                        <EmptyNotifications />
                    ) : (
                        <div className="space-y-2">
                            {notifications.map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                    onMarkAsRead={() => markAsReadMutation.mutate(notification.id)}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="unread" className="mt-6">
                    {isLoading ? (
                        <SkeletonList count={5} />
                    ) : unreadNotifications.length === 0 ? (
                        <EmptyNotifications />
                    ) : (
                        <div className="space-y-2">
                            {unreadNotifications.map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                    onMarkAsRead={() => markAsReadMutation.mutate(notification.id)}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

// Notification Card Component
interface NotificationCardProps {
    notification: Notification;
    onMarkAsRead: () => void;
}

function NotificationCard({ notification, onMarkAsRead }: NotificationCardProps) {
    const isUnread = !notification.readAt;

    return (
        <div
            className={cn(
                'bg-[var(--surface-1)] border border-[var(--border)] shadow-[var(--shadow-md)] rounded-xl backdrop-blur-xl p-4 transition-all hover:shadow-[var(--shadow-lg)]',
                isUnread && 'border-l-4 border-l-primary-500 bg-primary-50/50 dark:bg-primary-900/10'
            )}
        >
            <div className="flex items-start gap-4">
                <div
                    className={cn(
                        'p-2 rounded-lg',
                        isUnread
                            ? 'bg-primary-100 dark:bg-primary-900/30'
                            : 'bg-[var(--surface-2)]'
                    )}
                >
                    <Bell
                        className={cn(
                            'w-5 h-5',
                            isUnread
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-500 dark:text-gray-400'
                        )}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h3
                            className={cn(
                                'font-medium',
                                isUnread
                                    ? 'text-[var(--text)]'
                                    : 'text-[var(--text-2)]'
                            )}
                        >
                            {notification.title}
                        </h3>
                        {isUnread && (
                            <span className="flex h-2 w-2 flex-shrink-0">
                                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-[var(--text-2)] mb-2">
                        {notification.message}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-[var(--text-3)]">
                            <Clock className="w-3 h-3" />
                            {formatDateTime(notification.createdAt)}
                        </div>

                        {isUnread && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onMarkAsRead}
                                className="h-7 text-xs"
                            >
                                <Check className="w-3 h-3 mr-1" />
                                Đánh dấu đã đọc
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
