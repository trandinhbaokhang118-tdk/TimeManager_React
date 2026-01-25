import { create } from 'zustand';
import type { Notification } from '../types';

interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
    setNotifications: (notifications: Notification[]) => void;
    addNotification: (notification: Notification) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    unreadCount: 0,

    setNotifications: (notifications) => {
        const unreadCount = notifications.filter(n => !n.readAt).length;
        set({ notifications, unreadCount });
    },

    addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadCount: !notification.readAt ? state.unreadCount + 1 : state.unreadCount,
    })),

    markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n =>
            n.id === id ? { ...n, readAt: new Date().toISOString() } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
    })),

    markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({
            ...n,
            readAt: n.readAt || new Date().toISOString(),
        })),
        unreadCount: 0,
    })),

    removeNotification: (id) => set((state) => {
        const notification = state.notifications.find(n => n.id === id);
        return {
            notifications: state.notifications.filter(n => n.id !== id),
            unreadCount: notification && !notification.readAt
                ? Math.max(0, state.unreadCount - 1)
                : state.unreadCount,
        };
    }),
}));
