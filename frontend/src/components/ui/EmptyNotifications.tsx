import { Bell } from 'lucide-react';

export function EmptyNotifications() {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Bell className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No notifications
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                You're all caught up!
            </p>
        </div>
    );
}
