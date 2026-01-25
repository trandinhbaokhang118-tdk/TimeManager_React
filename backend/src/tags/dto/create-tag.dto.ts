import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional, Matches } from 'class-validator';

export class CreateTagDto {
    @ApiProperty({ example: 'Work' })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiPropertyOptional({ example: '#3B82F6' })
    @IsOptional()
    @IsString()
    @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'Color must be a valid hex color' })
    color?: string;
}
