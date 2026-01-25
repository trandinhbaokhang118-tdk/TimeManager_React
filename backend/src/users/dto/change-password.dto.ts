import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @ApiProperty({ example: 'oldPassword123' })
    @IsString()
    @MinLength(6)
    currentPassword: string;

    @ApiProperty({ example: 'newPassword123' })
    @IsString()
    @MinLength(6)
    newPassword: string;
}
