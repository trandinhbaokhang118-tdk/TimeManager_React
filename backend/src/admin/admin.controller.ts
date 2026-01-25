import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Get('stats')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Get system statistics' })
    async getStats() {
        return this.adminService.getSystemStats();
    }

    @Get('users')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Get all users' })
    async getAllUsers() {
        return this.adminService.getAllUsers();
    }

    @Patch('users/:id/role')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Update user role' })
    async updateUserRole(@Param('id') id: string, @Body() body: { role: string }) {
        return this.adminService.updateUserRole(id, body.role);
    }

    @Delete('users/:id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Delete user' })
    async deleteUser(@Param('id') id: string) {
        return this.adminService.deleteUser(id);
    }

    @Get('activity-logs')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Get activity logs' })
    async getActivityLogs() {
        return this.adminService.getActivityLogs();
    }

    @Post('backup')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Create database backup' })
    async createBackup() {
        return this.adminService.createBackup();
    }
}
