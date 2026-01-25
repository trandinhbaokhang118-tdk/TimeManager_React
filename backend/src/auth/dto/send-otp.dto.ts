import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
    @ApiProperty({ example: '0912345678' })
    @IsString()
    @Matches(/^[0-9]{10}$/, { message: 'Phone number must be 10 digits' })
    phone: string;
}
