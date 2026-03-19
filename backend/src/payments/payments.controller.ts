import { Controller, Get, Post, Put, Body, UseGuards, Request, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('payments')
@Controller('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('plans')
  @ApiOperation({ summary: 'Get all subscription plans' })
  async getPlans() {
    return this.paymentsService.getPlans();
  }

  @Post('plans')
  @ApiOperation({ summary: 'Create a subscription plan (admin only)' })
  async createPlan(@Body() dto: CreateSubscriptionPlanDto) {
    return this.paymentsService.createPlan(dto);
  }

  @Get('subscription')
  @ApiOperation({ summary: 'Get current user subscription' })
  async getSubscription(@Request() req: any) {
    return this.paymentsService.getSubscription(req.user.id);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Create checkout session' })
  async createCheckout(@Request() req: any, @Body() dto: CreateCheckoutDto) {
    return this.paymentsService.createCheckout(req.user.id, dto);
  }

  @Post('cancel')
  @ApiOperation({ summary: 'Cancel subscription' })
  async cancelSubscription(@Request() req: any) {
    return this.paymentsService.cancelSubscription(req.user.id);
  }

  @Post('webhook/:provider')
  @ApiOperation({ summary: 'Handle payment provider webhook' })
  async handleWebhook(
    @Body() payload: any,
  ) {
    // In production, add provider validation
    return this.paymentsService.handleWebhook('STRIPE', payload);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify payment' })
  async verifyPayment(@Body('paymentId') paymentId: string) {
    return this.paymentsService.verifyPayment(paymentId);
  }

  // Admin endpoints
  @Get('admin/subscriptions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all subscriptions (admin only)' })
  async getAllSubscriptions() {
    return this.paymentsService.getAllSubscriptions();
  }

  @Get('admin/subscriptions/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get user subscription by ID (admin only)' })
  async getUserSubscription(@Param('userId') userId: string) {
    return this.paymentsService.getUserSubscriptionById(userId);
  }

  @Put('admin/subscriptions/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update user subscription (admin only)' })
  async updateSubscription(
    @Param('userId') userId: string,
    @Body() data: { tier?: 'FREE' | 'PRO' | 'PLUS'; status?: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' },
  ) {
    return this.paymentsService.updateSubscription(userId, data);
  }
}
