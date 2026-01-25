import { IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
    @ApiProperty({ example: '0912345678' })
    @IsString()
    @Matches(/^[0-9]{10}$/, { message: 'Phone number must be 10 digits' })
    phone: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @Length(6, 6, { message: 'OTP must be 6 digits' })
    otp: string;
}
