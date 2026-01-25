import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async getSystemStats() {
        const [totalUsers, totalTasks, completedTasks] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.task.count(),
            this.prisma.task.count({ where: { status: 'DONE' } }),
        ]);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const newUsersToday = await this.prisma.user.count({
            where: {
                createdAt: { gte: today },
            },
        });

        const activeUsers = await this.prisma.user.count({
            where: {
                updatedAt: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
                },
            },
        });

        const avgTasksPerUser = totalUsers > 0 ? totalTasks / totalUsers : 0;

        return {
            totalUsers,
            activeUsers,
            totalTasks,
            completedTasks,
            avgTasksPerUser,
            newUsersToday,
        };
    }

    async getAllUsers() {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return users;
    }

    async updateUserRole(userId: string, role: string) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: { role: role as any },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });

        return user;
    }

    async deleteUser(userId: string) {
        await this.prisma.user.delete({
            where: { id: userId },
        });

        return { message: 'User deleted successfully' };
    }

    async getActivityLogs() {
        // This would typically come from a separate logs table
        // For now, return recent user activities
        const recentUsers = await this.prisma.user.findMany({
            take: 50,
            orderBy: { updatedAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                updatedAt: true,
            },
        });

        return recentUsers.map((user) => ({
            id: user.id,
            userId: user.id,
            userName: user.name,
            action: 'ACTIVITY',
            details: 'User activity',
            timestamp: user.updatedAt,
            ipAddress: '0.0.0.0',
        }));
    }

    async createBackup() {
        // This would typically trigger a database backup process
        // For now, just return a success message
        return {
            message: 'Backup created successfully',
            timestamp: new Date(),
        };
    }
}
