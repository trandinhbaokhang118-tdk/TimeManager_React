import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class QueryTimeBlockDto {
    @ApiProperty({ example: '2026-01-06T00:00:00Z' })
    @IsDateString()
    startDate: string;

    @ApiProperty({ example: '2026-01-12T23:59:59Z' })
    @IsDateString()
    endDate: string;
}
