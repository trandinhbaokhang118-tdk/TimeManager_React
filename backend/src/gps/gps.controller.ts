import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GpsService } from './gps.service';
import { StartTrackingDto } from './dto/start-tracking.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('gps')
@Controller('gps')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GpsController {
  constructor(private readonly gpsService: GpsService) {}

  @Post('track/start')
  @ApiOperation({ summary: 'Start GPS tracking session' })
  async startTracking(@Request() req: any, @Body() dto: StartTrackingDto) {
    return this.gpsService.startTracking(req.user.id, dto);
  }

  @Put('track/:id/location')
  @ApiOperation({ summary: 'Update GPS location' })
  async updateLocation(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateLocationDto,
  ) {
    return this.gpsService.updateLocation(req.user.id, id, dto);
  }

  @Post('track/:id/end')
  @ApiOperation({ summary: 'End GPS tracking session' })
  async endTracking(@Request() req: any, @Param('id') id: string) {
    return this.gpsService.endTracking(req.user.id, id);
  }

  @Get('routes')
  @ApiOperation({ summary: 'Get GPS route history' })
  async getRoutes(@Request() req: any, @Query('limit') limit?: number) {
    return this.gpsService.getRoutes(req.user.id, limit);
  }

  @Get('routes/:id')
  @ApiOperation({ summary: 'Get GPS route details' })
  async getRoute(@Request() req: any, @Param('id') id: string) {
    return this.gpsService.getRoute(req.user.id, id);
  }
}
