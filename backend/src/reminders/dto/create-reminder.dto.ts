import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, MinLength } from 'class-validator';

export class CreateReminderDto {
    @ApiProperty({ example: 'Submit project report' })
    @IsString()
    @MinLength(1)
    message: string;

    @ApiProperty({ example: '2026-01-15T09:00:00Z' })
    @IsDateString()
    triggerAt: string;
}
