import { Controller, Get, Put, Post, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FitnessService } from './fitness.service';
import { UpdateFitnessProfileDto } from './dto/update-fitness-profile.dto';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { SyncDailyActivityDto } from './dto/sync-daily-activity.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('fitness')
@Controller('fitness')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FitnessController {
  constructor(private readonly fitnessService: FitnessService) {}

  // ============ Profile ============

  @Get('profile')
  @ApiOperation({ summary: 'Get fitness profile' })
  async getProfile(@Request() req: any) {
    return this.fitnessService.getProfile(req.user.id);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update fitness profile' })
  async updateProfile(@Request() req: any, @Body() dto: UpdateFitnessProfileDto) {
    return this.fitnessService.updateProfile(req.user.id, dto);
  }

  @Post('profile/connect')
  @ApiOperation({ summary: 'Connect Apple Health or Google Fit' })
  async connectHealthDevice(
    @Request() req: any,
    @Body('provider') provider: 'apple_health' | 'google_fit',
  ) {
    return this.fitnessService.connectHealthDevice(req.user.id, provider);
  }

  // ============ Exercises ============

  @Post('exercises')
  @ApiOperation({ summary: 'Create exercise record' })
  async createExercise(@Request() req: any, @Body() dto: CreateExerciseDto) {
    return this.fitnessService.createExercise(req.user.id, dto);
  }

  @Get('exercises')
  @ApiOperation({ summary: 'Get exercise history' })
  async getExercises(
    @Request() req: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('category') category?: string,
  ) {
    return this.fitnessService.getExercises(
      req.user.id,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
      category,
    );
  }

  @Get('exercises/:id')
  @ApiOperation({ summary: 'Get exercise details' })
  async getExercise(@Request() req: any, @Param('id') id: string) {
    return this.fitnessService.getExercise(req.user.id, id);
  }

  @Delete('exercises/:id')
  @ApiOperation({ summary: 'Delete exercise' })
  async deleteExercise(@Request() req: any, @Param('id') id: string) {
    return this.fitnessService.deleteExercise(req.user.id, id);
  }

  // ============ Daily Activities ============

  @Post('activity/sync')
  @ApiOperation({ summary: 'Sync daily activity from device' })
  async syncActivity(@Request() req: any, @Body() dto: SyncDailyActivityDto) {
    return this.fitnessService.syncDailyActivity(req.user.id, dto);
  }

  @Get('activity/daily')
  @ApiOperation({ summary: 'Get daily activity' })
  async getDailyActivity(@Request() req: any, @Query('date') date: string) {
    return this.fitnessService.getDailyActivity(
      req.user.id,
      date ? new Date(date) : new Date(),
    );
  }

  @Get('activity/weekly')
  @ApiOperation({ summary: 'Get weekly activity stats' })
  async getWeeklyStats(@Request() req: any, @Query('startDate') startDate?: string) {
    return this.fitnessService.getWeeklyStats(
      req.user.id,
      startDate ? new Date(startDate) : new Date(),
    );
  }

  // ============ Premium Check ============

  @Get('premium-check/:feature')
  @ApiOperation({ summary: 'Check if user has premium feature access' })
  async checkPremiumFeature(@Request() req: any, @Param('feature') feature: string) {
    const hasAccess = await this.fitnessService.checkPremiumFeature(req.user.id, feature);
    return { feature, hasAccess };
  }
}
