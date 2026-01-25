import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class NotificationsService {
    constructor(private prisma: PrismaService) { }

    async findAll(userId: string, query: PaginationDto) {
        const { page = 1, limit = 10 } = query;

        const [notifications, total] = await Promise.all([
            this.prisma.notification.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.notification.count({ where: { userId } }),
        ]);

        return {
            data: notifications,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getUnreadCount(userId: string) {
        const count = await this.prisma.notification.count({
            where: { userId, readAt: null },
        });

        return { count };
    }

    async markAsRead(id: string, userId: string) {
        const notification = await this.prisma.notification.findUnique({
            where: { id },
        });

        if (!notification) {
            throw new NotFoundException({
                code: 'RESOURCE_NOT_FOUND',
                message: 'Notification not found',
            });
        }

        if (notification.userId !== userId) {
            throw new ForbiddenException({
                code: 'AUTH_FORBIDDEN',
                message: 'Access denied',
            });
        }

        return this.prisma.notification.update({
            where: { id },
            data: { readAt: new Date() },
        });
    }

    async markAllAsRead(userId: string) {
        await this.prisma.notification.updateMany({
            where: { userId, readAt: null },
            data: { readAt: new Date() },
        });

        return { message: 'All notifications marked as read' };
    }

    async createNotification(userId: string, title: string, message: string) {
        return this.prisma.notification.create({
            data: { userId, title, message },
        });
    }
}
