import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
    return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        ...options,
    }).format(new Date(date));
}

export function formatTime(date: string | Date) {
    return new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
}

export function formatDateTime(date: string | Date) {
    return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
}

export function parseQuickAdd(input: string) {
    const result: {
        title: string;
        dueAt?: Date;
        tags: string[];
        priority?: 'LOW' | 'MEDIUM' | 'HIGH';
    } = { title: '', tags: [] };

    let text = input.trim();

    // Parse priority: !high, !medium, !low
    const priorityMatch = text.match(/!(\w+)/i);
    if (priorityMatch) {
        const p = priorityMatch[1].toUpperCase();
        if (['HIGH', 'MEDIUM', 'LOW'].includes(p)) {
            result.priority = p as 'LOW' | 'MEDIUM' | 'HIGH';
        }
        text = text.replace(/!\w+/i, '').trim();
    }

    // Parse tags: #tag1 #tag2
    const tagMatches = text.match(/#(\w+)/g);
    if (tagMatches) {
        result.tags = tagMatches.map(t => t.slice(1));
        text = text.replace(/#\w+/g, '').trim();
    }

    // Parse time: 20:00, 8pm, etc.
    const timeMatch = text.match(/(\d{1,2}):(\d{2})|(\d{1,2})(am|pm)/i);
    if (timeMatch) {
        const now = new Date();
        let hours = 0;
        let minutes = 0;

        if (timeMatch[1] && timeMatch[2]) {
            hours = parseInt(timeMatch[1]);
            minutes = parseInt(timeMatch[2]);
        } else if (timeMatch[3] && timeMatch[4]) {
            hours = parseInt(timeMatch[3]);
            if (timeMatch[4].toLowerCase() === 'pm' && hours !== 12) hours += 12;
            if (timeMatch[4].toLowerCase() === 'am' && hours === 12) hours = 0;
        }

        now.setHours(hours, minutes, 0, 0);
        result.dueAt = now;
        text = text.replace(/(\d{1,2}):(\d{2})|(\d{1,2})(am|pm)/i, '').trim();
    }

    // Parse relative dates: hôm nay, ngày mai, tomorrow, today
    if (/hôm nay|today/i.test(text)) {
        if (!result.dueAt) result.dueAt = new Date();
        text = text.replace(/hôm nay|today/gi, '').trim();
    } else if (/ngày mai|tomorrow/i.test(text)) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (result.dueAt) {
            result.dueAt.setFullYear(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
        } else {
            result.dueAt = tomorrow;
        }
        text = text.replace(/ngày mai|tomorrow/gi, '').trim();
    }

    result.title = text.trim();
    return result;
}

export function getStatusColor(status: string) {
    switch (status) {
        case 'TODO': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
        case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
        case 'DONE': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
        case 'OVERDUE': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
        default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
}

export function getPriorityColor(priority: string) {
    switch (priority) {
        case 'HIGH': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
        case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
        case 'LOW': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
        default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
}

export function isOverdue(dueAt?: string | Date | null) {
    if (!dueAt) return false;
    return new Date(dueAt) < new Date();
}
