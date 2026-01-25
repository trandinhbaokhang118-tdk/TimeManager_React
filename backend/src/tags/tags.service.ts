import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createTagDto: CreateTagDto) {
        const { name, color } = createTagDto;

        // Check if tag with same name exists for user
        const existing = await this.prisma.tag.findUnique({
            where: { userId_name: { userId, name } },
        });

        if (existing) {
            throw new ConflictException({
                code: 'TAG_EXISTS',
                message: 'Tag with this name already exists',
            });
        }

        return this.prisma.tag.create({
            data: {
                userId,
                name,
                color: color || '#3B82F6',
            },
        });
    }

    async findAll(userId: string) {
        return this.prisma.tag.findMany({
            where: { userId },
            orderBy: { name: 'asc' },
        });
    }

    async findOne(id: string, userId: string) {
        const tag = await this.prisma.tag.findUnique({
            where: { id },
        });

        if (!tag) {
            throw new NotFoundException({
                code: 'RESOURCE_NOT_FOUND',
                message: 'Tag not found',
            });
        }

        if (tag.userId !== userId) {
            throw new ForbiddenException({
                code: 'AUTH_FORBIDDEN',
                message: 'Access denied',
            });
        }

        return tag;
    }

    async remove(id: string, userId: string) {
        await this.findOne(id, userId); // Validates ownership

        await this.prisma.tag.delete({
            where: { id },
        });

        return { message: 'Tag deleted successfully' };
    }
}
