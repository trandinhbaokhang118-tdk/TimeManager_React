import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString, IsArray, IsUUID, MinLength, IsInt, Min, Max } from 'class-validator';
import { TaskStatus, TaskPriority } from '@prisma/client';

export class CreateTaskDto {
    @ApiProperty({ example: 'Complete project report' })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiPropertyOptional({ example: 'Write the final report for Q4' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ enum: TaskStatus, default: TaskStatus.TODO })
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @ApiPropertyOptional({ enum: TaskPriority, default: TaskPriority.MEDIUM })
    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @ApiProperty({ example: '2026-01-20T09:00:00Z', description: 'Task start time' })
    @IsDateString()
    startAt: string;

    @ApiProperty({ example: '2026-01-20T10:00:00Z', description: 'Task due time' })
    @IsDateString()
    dueAt: string;

    @ApiPropertyOptional({ example: 15, description: 'Remind before start time (minutes)', default: 15 })
    @IsOptional()
    @IsInt()
    @Min(5)
    @Max(1440)
    reminderMinutes?: number;

    @ApiPropertyOptional({ type: [String], example: ['uuid1', 'uuid2'] })
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    tagIds?: string[];
}
