import api from './api';
import type { Subscription, SubscriptionPlan, CreateCheckoutRequest, ApiResponse } from '../types';

export const subscriptionsService = {
    async getPlans(): Promise<SubscriptionPlan[]> {
        const response = await api.get<ApiResponse<SubscriptionPlan[]>>('/payments/plans');
        return response.data.data;
    },

    async getSubscription(): Promise<Subscription> {
        const response = await api.get<ApiResponse<Subscription>>('/payments/subscription');
        return response.data.data;
    },

    async createCheckout(data: CreateCheckoutRequest): Promise<{ checkoutUrl: string; subscription: Subscription }> {
        const response = await api.post<ApiResponse<{ checkoutUrl: string; subscription: Subscription }>>('/payments/checkout', data);
        return response.data.data;
    },

    async cancelSubscription(): Promise<Subscription> {
        const response = await api.post<ApiResponse<Subscription>>('/payments/cancel');
        return response.data.data;
    },

    async verifyPayment(paymentId: string): Promise<{ verified: boolean; paymentId: string }> {
        const response = await api.post<ApiResponse<{ verified: boolean; paymentId: string }>>('/payments/verify', { paymentId });
        return response.data.data;
    },

    // Admin methods
    async getAllSubscriptions(): Promise<(Subscription & { user: { id: string; email: string; name: string } })[]> {
        const response = await api.get<ApiResponse<any[]>>('/payments/admin/subscriptions');
        return response.data.data;
    },

    async getUserSubscription(userId: string): Promise<Subscription> {
        const response = await api.get<ApiResponse<any>>(`/payments/admin/subscriptions/${userId}`);
        return response.data.data;
    },

    async updateSubscription(userId: string, data: { tier?: string; status?: string }): Promise<Subscription> {
        const response = await api.put<ApiResponse<any>>(`/payments/admin/subscriptions/${userId}`, data);
        return response.data.data;
    },
};
