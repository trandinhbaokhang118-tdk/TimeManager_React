import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async getPlans() {
    return this.prisma.subscriptionPlan.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async createPlan(dto: CreateSubscriptionPlanDto) {
    return this.prisma.subscriptionPlan.create({
      data: dto as any,
    });
  }

  async getSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
      include: { user: { select: { id: true, email: true, name: true } } },
    });

    if (!subscription) {
      // Return default free tier
      return {
        tier: 'FREE',
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: null,
      };
    }

    return subscription;
  }

  async createCheckout(userId: string, dto: CreateCheckoutDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { tier: dto.tier },
    });
    if (!plan) throw new NotFoundException('Plan not found');

    // For demo purposes, return a mock checkout URL
    // In production, integrate with Stripe/VNPay
    const checkoutUrl = `https://checkout.stripe.com/demo?plan=${plan.tier}&user=${user.email}&amount=${dto.provider === 'STRIPE' ? plan.priceUSD : plan.priceVND}`;

    // Create pending subscription
    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setMonth(periodEnd.getMonth() + 1);

    await this.prisma.subscription.upsert({
      where: { userId },
      create: {
        userId,
        tier: dto.tier,
        status: 'TRIALING',
        provider: dto.provider,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
      },
      update: {
        tier: dto.tier,
        status: 'TRIALING',
        provider: dto.provider,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
      },
    });

    return {
      checkoutUrl,
      subscription: {
        tier: dto.tier,
        status: 'TRIALING',
        currentPeriodEnd: periodEnd,
      },
    };
  }

  async cancelSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      throw new NotFoundException('No active subscription found');
    }

    return this.prisma.subscription.update({
      where: { userId },
      data: {
        status: 'CANCELED',
        canceledAt: new Date(),
      },
    });
  }

  async handleWebhook(provider: string, payload: any) {
    // Handle payment provider webhooks
    // In production, verify webhook signatures and process events

    if (provider === 'STRIPE') {
      const eventType = payload.type;
      const data = payload.data?.object;

      if (eventType === 'checkout.session.completed') {
        const email = data?.customer_email || data?.customer_details?.email;
        if (email) {
          const user = await this.prisma.user.findUnique({ where: { email } });
          if (user) {
            await this.prisma.subscription.update({
              where: { userId: user.id },
              data: { status: 'ACTIVE' },
            });
          }
        }
      }
    }

    return { received: true };
  }

  async verifyPayment(paymentId: string) {
    // Verify payment with provider
    // For demo, always return success
    return { verified: true, paymentId };
  }

  // Admin methods
  async getAllSubscriptions() {
    return this.prisma.subscription.findMany({
      include: { user: { select: { id: true, email: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserSubscriptionById(userId: string) {
    return this.prisma.subscription.findUnique({
      where: { userId },
      include: { user: { select: { id: true, email: true, name: true } } },
    });
  }

  async updateSubscription(userId: string, data: { tier?: 'FREE' | 'PRO' | 'PLUS'; status?: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' }) {
    return this.prisma.subscription.update({
      where: { userId },
      data: data as any,
    });
  }

  // Seed default subscription plans
  async seedPlans() {
    const existingPlans = await this.prisma.subscriptionPlan.count();
    if (existingPlans > 0) return;

    const plans = [
      {
        tier: 'FREE',
        name: 'Free',
        description: 'Basic features for everyone',
        priceVND: 0,
        priceUSD: 0,
        interval: 'month',
        features: ['Tasks & Calendar', 'Basic AI Assistant', '5 Time Blocks/day'],
        isActive: true,
        sortOrder: 1,
      },
      {
        tier: 'PRO',
        name: 'Pro',
        description: 'Enhanced productivity',
        priceVND: 99000,
        priceUSD: 499,
        interval: 'month',
        features: [
          'Unlimited Tasks & Calendar',
          'Advanced AI Assistant',
          'Unlimited Time Blocks',
          'Basic Fitness Tracking',
          'No Ads',
          'Priority Support',
        ],
        isActive: true,
        sortOrder: 2,
      },
      {
        tier: 'PLUS',
        name: 'Plus',
        description: 'Full experience with fitness',
        priceVND: 199000,
        priceUSD: 999,
        interval: 'month',
        features: [
          'Everything in Pro',
          'GPS Tracking',
          'Full Fitness Features',
          'Apple Health / Google Fit',
          'Cloud Sync',
          'Data Export',
          'Premium Support',
        ],
        isActive: true,
        sortOrder: 3,
      },
    ];

    await this.prisma.subscriptionPlan.createMany({ data: plans as any });
  }
}
