import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: ['cardio', 'strength', 'flexibility', 'balance', 'endurance'] })
  @IsString()
  category: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  subCategory?: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  distance?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  steps?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  caloriesBurned?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  avgHeartRate?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  avgPace?: number;

  @ApiProperty({ required: false, enum: ['low', 'moderate', 'high'], default: 'moderate' })
  @IsString()
  @IsOptional()
  intensity?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  performedAt?: string;
}
