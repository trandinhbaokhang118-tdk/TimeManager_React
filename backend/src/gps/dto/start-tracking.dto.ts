import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartTrackingDto {
  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  longitude: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  activityType?: string;

  @ApiProperty({ required: false, enum: ['cardio', 'strength', 'flexibility', 'balance', 'endurance'] })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: false, enum: ['low', 'moderate', 'high'], default: 'moderate' })
  @IsString()
  @IsOptional()
  intensity?: string;
}
