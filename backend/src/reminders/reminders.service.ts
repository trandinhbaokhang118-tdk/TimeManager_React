import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';

@Injectable()
export class RemindersService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createDto: CreateReminderDto) {
        return this.prisma.reminder.create({
            data: {
                userId,
                message: createDto.message,
                triggerAt: new Date(createDto.triggerAt),
            },
        });
    }

    async findAll(userId: string) {
        return this.prisma.reminder.findMany({
            where: { userId },
            orderBy: { triggerAt: 'asc' },
        });
    }

    async findOne(id: string, userId: string) {
        const reminder = await this.prisma.reminder.findUnique({
            where: { id },
        });

        if (!reminder) {
            throw new NotFoundException({
                code: 'RESOURCE_NOT_FOUND',
                message: 'Reminder not found',
            });
        }

        if (reminder.userId !== userId) {
            throw new ForbiddenException({
                code: 'AUTH_FORBIDDEN',
                message: 'Access denied',
            });
        }

        return reminder;
    }

    async remove(id: string, userId: string) {
        await this.findOne(id, userId);

        await this.prisma.reminder.delete({ where: { id } });

        return { message: 'Reminder deleted successfully' };
    }
}
