import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SyncDailyActivityDto {
  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty({ required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  steps?: number;

  @ApiProperty({ required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  distance?: number;

  @ApiProperty({ required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  calories?: number;

  @ApiProperty({ required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  activeMinutes?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  sleepMinutes?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  heartRateAvg?: number;

  @ApiProperty({ required: false, enum: ['apple_health', 'google_fit', 'manual'] })
  @IsString()
  @IsOptional()
  source?: string;
}
