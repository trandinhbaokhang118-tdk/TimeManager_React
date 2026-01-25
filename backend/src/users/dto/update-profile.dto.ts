import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsOptional()
    @MinLength(2)
    name?: string;

    @ApiProperty({ example: 'john@example.com' })
    @IsEmail()
    @IsOptional()
    email?: string;
}
