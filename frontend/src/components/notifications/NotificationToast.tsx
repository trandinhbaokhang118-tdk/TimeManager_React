import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import { showToast } from '../ui/toast';
import { useNotificationStore } from '../../store/notification.store';
import { notificationsService } from '../../services/notifications.service';
import { useAuthStore } from '../../store/auth.store';

export function NotificationListener() {
    const { isAuthenticated } = useAuthStore();
    const { notifications, addNotification } = useNotificationStore();

    const { data: notificationsData } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => notificationsService.getAll(1, 50), // Fetch first 50 notifications
        refetchInterval: 30000, // Poll every 30 seconds
        enabled: isAuthenticated, // Only fetch when authenticated
        retry: false, // Don't retry on error
        refetchOnWindowFocus: false, // Don't refetch on window focus
    });

    useEffect(() => {
        if (notificationsData?.data) {
            // Check for new notifications
            const existingIds = new Set(notifications.map(n => n.id));
            const newNotifications = notificationsData.data.filter(n => !existingIds.has(n.id));

            // Show toast for new notifications
            newNotifications.forEach(notification => {
                addNotification(notification);

                // Only show toast for unread notifications
                if (!notification.readAt) {
                    showToast.info(notification.title, notification.message);
                }
            });
        }
    }, [notificationsData, notifications, addNotification]);

    return null; // This is a listener component, no UI
}
