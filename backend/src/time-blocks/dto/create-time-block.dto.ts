import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, MinLength } from 'class-validator';

export class CreateTimeBlockDto {
    @ApiProperty({ example: 'Deep work session' })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiPropertyOptional({ example: 'Focus on project development' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: '2026-01-12T09:00:00Z' })
    @IsDateString()
    startAt: string;

    @ApiProperty({ example: '2026-01-12T11:00:00Z' })
    @IsDateString()
    endAt: string;
}
