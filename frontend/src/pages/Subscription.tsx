import { useState, useEffect } from 'react';
import { subscriptionsService } from '../services/subscriptions.service';
import { useAuthStore } from '../store/auth.store';
import { cn } from '../lib/utils';
import type {
    SubscriptionPlan,
    Subscription,
    SubscriptionTier,
    PaymentProvider,
    SubscriptionStatus,
} from '../types';

type SubscriptionWithUser = Subscription & {
    user?: { id: string; email: string; name: string };
};

const providerLabels: Record<PaymentProvider, string> = {
    STRIPE: 'Stripe',
    VNPAY: 'VNPay',
    MOMO: 'MoMo',
    ZALOPAY: 'ZaloPay',
};

export function Subscription() {
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('STRIPE');
    const [activeTab, setActiveTab] = useState<'my' | 'admin'>('my');

    const [allSubscriptions, setAllSubscriptions] = useState<SubscriptionWithUser[]>([]);
    const [adminLoading, setAdminLoading] = useState(false);
    const [editingSubscription, setEditingSubscription] = useState<string | null>(null);

    const { user } = useAuthStore();
    const isAdmin = user?.role === 'ADMIN';

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (activeTab === 'admin' && isAdmin && allSubscriptions.length === 0) {
            loadAllSubscriptions();
        }
    }, [activeTab, isAdmin, allSubscriptions.length]);

    const loadData = async () => {
        try {
            const [plansData, subscriptionData] = await Promise.all([
                subscriptionsService.getPlans(),
                subscriptionsService.getSubscription(),
            ]);
            setPlans(plansData);
            setCurrentSubscription(subscriptionData as Subscription);
        } catch (error) {
            console.error('Failed to load subscription data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadAllSubscriptions = async () => {
        setAdminLoading(true);
        try {
            const data = await subscriptionsService.getAllSubscriptions();
            setAllSubscriptions(data);
        } catch (error) {
            console.error('Failed to load all subscriptions:', error);
            alert('Failed to load subscriptions. Are you an admin?');
        } finally {
            setAdminLoading(false);
        }
    };

    const handleUpgrade = async (tier: SubscriptionTier) => {
        if (tier === 'FREE' || currentSubscription?.tier === tier) return;

        setProcessing(true);
        try {
            const result = await subscriptionsService.createCheckout({
                tier,
                provider: selectedProvider,
            });

            alert(`Checkout created! In production, you would be redirected to:\n${result.checkoutUrl}`);
            loadData();
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('Failed to create checkout. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    const handleCancel = async () => {
        if (!confirm('Are you sure you want to cancel your subscription?')) return;

        setProcessing(true);
        try {
            await subscriptionsService.cancelSubscription();
            alert('Subscription canceled successfully.');
            loadData();
        } catch (error) {
            console.error('Cancel failed:', error);
            alert('Failed to cancel subscription.');
        } finally {
            setProcessing(false);
        }
    };

    const handleUpdateSubscription = async (
        userId: string,
        data: { tier?: SubscriptionTier; status?: SubscriptionStatus }
    ) => {
        try {
            await subscriptionsService.updateSubscription(userId, data);
            alert('Subscription updated successfully.');
            setEditingSubscription(null);
            loadAllSubscriptions();
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update subscription.');
        }
    };

    if (loading) {
        return (
            <div className="page-shell flex min-h-[400px] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-full border-4 border-[var(--surface-highlight-border)]" />
                        <div className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent" />
                    </div>
                    <p className="text-sm text-[var(--text-2)]">Loading subscription plans...</p>
                </div>
            </div>
        );
    }

    const currentTier = currentSubscription?.tier || 'FREE';

    const renderAdminTab = () => {
        if (adminLoading) {
            return (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--primary)]" />
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[var(--text)]">All subscriptions</h2>
                    <button
                        onClick={loadAllSubscriptions}
                        className="btn-neon px-4 py-2 text-sm"
                    >
                        Refresh
                    </button>
                </div>

                <div className="surface-panel overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-[var(--surface-3)]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-3)]">
                                        User
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-3)]">
                                        Tier
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-3)]">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-3)]">
                                        Period end
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-3)]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--divider)]">
                                {allSubscriptions.map((sub) => {
                                    const subscriptionUserId = sub.userId ?? sub.user?.id ?? null;
                                    const rowKey =
                                        sub.id ??
                                        subscriptionUserId ??
                                        sub.user?.email ??
                                        `${sub.tier}-${sub.status}-${sub.currentPeriodEnd ?? 'none'}`;
                                    const canEdit = Boolean(subscriptionUserId);

                                    return (
                                        <tr key={rowKey} className="transition-colors hover:bg-[var(--surface-3)]">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm font-medium text-[var(--text)]">
                                                    {sub.user?.name || 'Unknown'}
                                                </div>
                                                <div className="text-sm text-[var(--text-2)]">
                                                    {sub.user?.email || 'Unknown'}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {editingSubscription === subscriptionUserId && canEdit ? (
                                                    <select
                                                        defaultValue={sub.tier}
                                                        onChange={(e) => {
                                                            if (!subscriptionUserId) return;
                                                            handleUpdateSubscription(subscriptionUserId, {
                                                                tier: e.target.value as SubscriptionTier,
                                                                status: sub.status,
                                                            });
                                                        }}
                                                        className="input h-10 rounded-lg px-3 text-sm"
                                                    >
                                                        <option value="FREE">FREE</option>
                                                        <option value="PRO">PRO</option>
                                                        <option value="PLUS">PLUS</option>
                                                    </select>
                                                ) : (
                                                    <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-semibold', getTierBadgeClass(sub.tier))}>
                                                        {sub.tier}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {editingSubscription === subscriptionUserId && canEdit ? (
                                                    <select
                                                        defaultValue={sub.status}
                                                        onChange={(e) => {
                                                            if (!subscriptionUserId) return;
                                                            handleUpdateSubscription(subscriptionUserId, {
                                                                tier: sub.tier,
                                                                status: e.target.value as SubscriptionStatus,
                                                            });
                                                        }}
                                                        className="input h-10 rounded-lg px-3 text-sm"
                                                    >
                                                        <option value="ACTIVE">ACTIVE</option>
                                                        <option value="TRIALING">TRIALING</option>
                                                        <option value="CANCELED">CANCELED</option>
                                                        <option value="PAST_DUE">PAST_DUE</option>
                                                    </select>
                                                ) : (
                                                    <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-semibold', getStatusBadgeClass(sub.status))}>
                                                        {sub.status}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-[var(--text-2)]">
                                                {sub.currentPeriodEnd
                                                    ? new Date(sub.currentPeriodEnd).toLocaleDateString()
                                                    : 'N/A'}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                {editingSubscription === subscriptionUserId && canEdit ? (
                                                    <button
                                                        onClick={() => setEditingSubscription(null)}
                                                        className="text-[var(--text-2)] transition-colors hover:text-[var(--text)]"
                                                    >
                                                        Cancel
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => canEdit && setEditingSubscription(subscriptionUserId)}
                                                        disabled={!canEdit}
                                                        className="text-[var(--primary)] transition-colors hover:text-[var(--text)] disabled:cursor-not-allowed disabled:text-[var(--text-3)]"
                                                    >
                                                        {canEdit ? 'Edit' : 'Unavailable'}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {allSubscriptions.length === 0 && (
                    <div className="surface-soft p-8 text-center text-[var(--text-2)]">
                        No subscriptions found.
                    </div>
                )}
            </div>
        );
    };

    const renderMySubscriptionTab = () => (
        <>
            <div className="mb-10 text-center">
                <h1 className="mb-3 text-4xl font-bold text-[var(--text)]">
                    <span className="bg-[image:var(--primary-gradient)] bg-clip-text text-transparent">
                        Upgrade your plan
                    </span>
                </h1>
                <p className="text-lg text-[var(--text-2)]">
                    Choose the right tier for productivity, fitness and premium tools.
                </p>
            </div>

            {currentTier !== 'FREE' && (
                <div className="challenge-banner mb-8 p-6">
                    <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm text-[var(--primary)]">Current plan</p>
                            <p className="text-2xl font-bold text-[var(--text)]">
                                {currentSubscription?.tier} Plan
                            </p>
                            {currentSubscription?.currentPeriodEnd && (
                                <p className="text-sm text-[var(--text-2)]">
                                    Expires: {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleCancel}
                            disabled={processing}
                            className="rounded-lg border border-red-500/30 px-4 py-2 font-medium text-red-500 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Cancel subscription
                        </button>
                    </div>
                </div>
            )}

            <div className="mb-10">
                <h3 className="mb-4 text-sm font-medium text-[var(--text)]">Payment method</h3>
                <div className="flex flex-wrap gap-3">
                    {(Object.keys(providerLabels) as PaymentProvider[]).map((provider) => (
                        <button
                            key={provider}
                            onClick={() => setSelectedProvider(provider)}
                            className={cn(
                                'rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300',
                                selectedProvider === provider
                                    ? 'border-[var(--surface-highlight-border)] bg-[var(--surface-highlight)] text-[var(--primary)] shadow-[var(--shadow-md)]'
                                    : 'border-[var(--border)] bg-[var(--surface-1)] text-[var(--text-2)] hover:border-[var(--surface-highlight-border)] hover:text-[var(--text)]'
                            )}
                        >
                            {providerLabels[provider]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {plans.map((plan) => {
                    const isCurrentPlan = plan.tier === currentTier;
                    const isPlus = plan.tier === 'PLUS';
                    const isPro = plan.tier === 'PRO';
                    const price =
                        selectedProvider === 'STRIPE'
                            ? `$${(plan.priceUSD / 100).toFixed(2)}`
                            : `${plan.priceVND.toLocaleString('vi-VN')}₫`;

                    return (
                        <div
                            key={plan.id}
                            className={cn(
                                'surface-card-hover relative p-6',
                                isPro && 'border-[var(--surface-highlight-border)] shadow-[var(--primary-glow)]',
                                isPlus && 'border-sky-400/40 shadow-[0_16px_40px_rgba(59,130,246,0.18)]'
                            )}
                        >
                            {isPlus && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 px-5 py-1.5 text-sm font-semibold text-white shadow-lg">
                                    Best value
                                </div>
                            )}

                            {isPro && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[image:var(--primary-gradient)] px-5 py-1.5 text-sm font-semibold text-[var(--btn-primary-text)] shadow-lg">
                                    Popular
                                </div>
                            )}

                            <div className="mb-6 mt-2 text-center">
                                <h3 className="text-xl font-bold text-[var(--text)]">{plan.name}</h3>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold text-[var(--text)]">{price}</span>
                                    <span className="text-[var(--text-2)]">/month</span>
                                </div>
                                {plan.description && (
                                    <p className="mt-2 text-sm text-[var(--text-2)]">{plan.description}</p>
                                )}
                            </div>

                            <ul className="mb-6 space-y-3">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-sm text-[var(--text-2)]">
                                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--surface-highlight)] text-[var(--primary)]">
                                            ✓
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleUpgrade(plan.tier as SubscriptionTier)}
                                disabled={isCurrentPlan || processing}
                                className={cn(
                                    'w-full rounded-lg border px-4 py-3 font-semibold transition-all duration-300',
                                    isCurrentPlan &&
                                        'cursor-not-allowed border-[var(--border)] bg-[var(--surface-3)] text-[var(--text-3)]',
                                    !isCurrentPlan && isPro && 'border-transparent bg-[image:var(--primary-gradient)] text-[var(--btn-primary-text)] shadow-[var(--primary-glow)] hover:shadow-[var(--primary-glow-hover)]',
                                    !isCurrentPlan &&
                                        isPlus &&
                                        'border-transparent bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 text-white shadow-lg hover:shadow-xl',
                                    !isCurrentPlan &&
                                        !isPro &&
                                        !isPlus &&
                                        'border-[var(--border)] bg-[var(--surface-1)] text-[var(--text)] hover:border-[var(--surface-highlight-border)] hover:text-[var(--primary)]'
                                )}
                            >
                                {isCurrentPlan ? 'Current plan' : processing ? 'Processing...' : 'Upgrade'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );

    return (
        <div className="page-shell">
            <div className="mx-auto max-w-6xl space-y-8">
                {isAdmin && (
                    <div className="flex border-b border-[var(--divider)]">
                        <button
                            onClick={() => setActiveTab('my')}
                            className={cn(
                                'px-6 py-3 text-sm font-medium transition-all duration-300',
                                activeTab === 'my'
                                    ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]'
                                    : 'text-[var(--text-2)] hover:text-[var(--text)]'
                            )}
                        >
                            My subscription
                        </button>
                        <button
                            onClick={() => setActiveTab('admin')}
                            className={cn(
                                'px-6 py-3 text-sm font-medium transition-all duration-300',
                                activeTab === 'admin'
                                    ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]'
                                    : 'text-[var(--text-2)] hover:text-[var(--text)]'
                            )}
                        >
                            Admin
                        </button>
                    </div>
                )}

                {activeTab === 'admin' ? renderAdminTab() : renderMySubscriptionTab()}
            </div>
        </div>
    );
}

function getTierBadgeClass(tier: SubscriptionTier) {
    if (tier === 'PLUS') {
        return 'border border-sky-400/30 bg-sky-500/10 text-sky-500';
    }

    if (tier === 'PRO') {
        return 'border border-[var(--surface-highlight-border)] bg-[var(--surface-highlight)] text-[var(--primary)]';
    }

    return 'border border-[var(--border)] bg-[var(--surface-3)] text-[var(--text-2)]';
}

function getStatusBadgeClass(status: SubscriptionStatus) {
    if (status === 'ACTIVE') {
        return 'bg-success-var';
    }

    if (status === 'TRIALING') {
        return 'bg-warning-var';
    }

    if (status === 'CANCELED') {
        return 'bg-danger-var';
    }

    return 'border border-[var(--border)] bg-[var(--surface-3)] text-[var(--text-2)]';
}
