import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Flame, Clock3, Footprints, Settings, ArrowRight, Play } from 'lucide-react';
import type { ReactNode } from 'react';
import { fitnessService } from '../services/fitness.service';
import type { FitnessProfile, DailyActivity, WeeklyStats, Exercise } from '../types';

const ActivityIcon = ({ category, size = 20 }: { category: string; size?: number }) => {
    const icons: Record<string, string> = {
        cardio: '🏃',
        running: '🏃',
        cycling: '🚴',
        swimming: '🏊',
        walking: '🚶',
        hiking: '🥾',
        strength: '🏋️',
        flexibility: '🧘',
    };

    return <span style={{ fontSize: size }}>{icons[category] || '💪'}</span>;
};

export function Fitness() {
    const [profile, setProfile] = useState<FitnessProfile | null>(null);
    const [todayActivity, setTodayActivity] = useState<DailyActivity | null>(null);
    const [weeklyStats, setWeeklyStats] = useState<WeeklyStats | null>(null);
    const [recentExercises, setRecentExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [profileData, activityData, statsData, exercisesData] = await Promise.all([
                fitnessService.getProfile(),
                fitnessService.getDailyActivity(),
                fitnessService.getWeeklyStats(),
                fitnessService.getExercises(),
            ]);
            setProfile(profileData);
            setTodayActivity(activityData);
            setWeeklyStats(statsData);
            setRecentExercises(exercisesData.slice(0, 5));
        } catch (error) {
            console.error('Failed to load fitness data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="page-shell flex items-center justify-center">
                <div className="relative">
                    <div className="h-12 w-12 rounded-full border-4 border-[var(--surface-highlight-border)]" />
                    <div className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent" />
                </div>
            </div>
        );
    }

    const stepGoal = profile?.stepGoal ?? 0;
    const steps = todayActivity?.steps ?? 0;
    const stepsProgress = stepGoal > 0 ? Math.min((steps / stepGoal) * 100, 100) : 0;

    return (
        <div className="page-shell pb-24">
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold md:text-3xl">
                            <span className="bg-[image:var(--primary-gradient)] bg-clip-text text-transparent">
                                Fitness
                            </span>
                        </h1>
                        <p className="text-[var(--text-2)]">Track your activities with the project neon-ocean vibe.</p>
                    </div>
                    <Link
                        to="/app/fitness/profile"
                        className="surface-soft flex h-11 w-11 items-center justify-center transition-colors hover:border-[var(--surface-highlight-border)] hover:text-[var(--primary)]"
                        aria-label="Open fitness profile"
                    >
                        <Settings className="h-5 w-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    <SummaryCard
                        icon={<MapPin className="h-4 w-4" />}
                        label="Distance"
                        value={(todayActivity?.distance || 0).toFixed(1)}
                        unit="km"
                    />
                    <SummaryCard
                        icon={<Flame className="h-4 w-4" />}
                        label="Calories"
                        value={String(todayActivity?.calories || 0)}
                        unit="cal"
                    />
                    <SummaryCard
                        icon={<Clock3 className="h-4 w-4" />}
                        label="Active"
                        value={String(todayActivity?.activeMinutes || 0)}
                        unit="min"
                    />
                    <SummaryCard
                        icon={<Footprints className="h-4 w-4" />}
                        label="Steps"
                        value={steps.toLocaleString()}
                    />
                </div>

                <div className="fitness-card p-5">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-[var(--text)]">Daily steps goal</span>
                        <span className="text-sm font-semibold text-[var(--primary)]">
                            {Math.round(stepsProgress)}%
                        </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-[var(--panel-soft)]">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${stepsProgress}%`,
                                background: 'var(--primary-gradient)',
                                boxShadow: 'var(--primary-glow)',
                            }}
                        />
                    </div>
                    <p className="mt-2 text-xs text-[var(--text-2)]">
                        {steps.toLocaleString()} / {stepGoal.toLocaleString()} steps
                    </p>
                </div>

                <div className="fitness-card p-5">
                    <h3 className="mb-4 font-semibold text-[var(--text)]">This week</h3>
                    <div className="flex h-24 items-end justify-between gap-2">
                        {weeklyStats?.days.map((day, index) => {
                            const maxSteps = Math.max(...(weeklyStats?.days.map((item) => item.steps) || [1]), 1);
                            const height = (day.steps / maxSteps) * 100;
                            const dayName = new Date(day.date)
                                .toLocaleDateString('en', { weekday: 'short' })
                                .slice(0, 1);

                            return (
                                <div key={index} className="flex flex-1 flex-col items-center">
                                    <div className="flex w-6 justify-center">
                                        <div
                                            className="w-5 rounded-t-md transition-all duration-300"
                                            style={{
                                                height: `${Math.max(height, 4)}%`,
                                                background: 'var(--primary-gradient)',
                                                boxShadow: height > 50 ? 'var(--primary-glow)' : 'none',
                                            }}
                                        />
                                    </div>
                                    <span className="mt-2 text-xs text-[var(--text-2)]">{dayName}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-4 flex justify-around border-t border-[var(--divider)] pt-4">
                        <WeeklyStat label="Total steps" value={(weeklyStats?.totalSteps || 0).toLocaleString()} />
                        <WeeklyStat label="Calories" value={String(weeklyStats?.totalCalories || 0)} tone="warning" />
                        <WeeklyStat
                            label="Minutes"
                            value={String(weeklyStats?.totalActiveMinutes || 0)}
                            tone="success"
                        />
                    </div>
                </div>

                <div className="challenge-banner p-5">
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-[var(--text)]">Monthly challenge</h3>
                            <p className="text-sm text-[var(--text-2)]">Run 50km this month</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-[var(--primary)]">32km</p>
                            <p className="text-xs text-[var(--text-2)]">of 50km</p>
                        </div>
                    </div>
                    <div className="relative z-10 mt-3 h-2 overflow-hidden rounded-full bg-[var(--panel-soft)]">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: '64%', background: 'var(--primary-gradient)' }}
                        />
                    </div>
                </div>

                <div className="fitness-card p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-[var(--text)]">Recent activities</h3>
                        <Link
                            to="/app/gps-tracking"
                            className="flex items-center gap-1 text-sm text-[var(--primary)] transition-colors hover:text-[var(--text)]"
                        >
                            View all
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {recentExercises.length === 0 ? (
                        <div className="py-8 text-center">
                            <span className="mb-3 block text-4xl">🏃</span>
                            <p className="text-[var(--text-2)]">No activities yet</p>
                            <Link
                                to="/app/gps-tracking"
                                state={{ autoStart: true }}
                                className="btn-neon mt-4 inline-flex items-center gap-2"
                            >
                                <Play className="h-4 w-4" />
                                Start your first workout
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentExercises.map((exercise) => (
                                <div
                                    key={exercise.id}
                                    className="surface-soft flex items-center justify-between p-3 transition-colors hover:border-[var(--surface-highlight-border)]"
                                >
                                    <div className="flex items-center gap-3">
                                        <ActivityIcon category={exercise.category} size={24} />
                                        <div>
                                            <p className="font-medium text-[var(--text)]">{exercise.name}</p>
                                            <p className="text-xs text-[var(--text-2)]">
                                                {new Date(exercise.performedAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-[var(--primary)]">{exercise.duration} min</p>
                                        {exercise.distance && (
                                            <p className="text-xs text-[var(--text-2)]">
                                                {exercise.distance.toFixed(1)} km
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="fitness-card p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 className="font-semibold text-[var(--text)]">Health Connect</h3>
                            <p className="text-sm text-[var(--text-2)]">Sync with Apple Health or Google Fit</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="rounded-lg border border-[var(--border)] bg-[var(--surface-3)] px-3 py-2 text-sm text-[var(--text)] transition-colors hover:border-[var(--surface-highlight-border)] hover:text-[var(--primary)]">
                                Apple Health
                            </button>
                            <button className="rounded-lg border border-[var(--border)] bg-[var(--surface-3)] px-3 py-2 text-sm text-[var(--text)] transition-colors hover:border-[var(--surface-highlight-border)] hover:text-[var(--primary)]">
                                Google Fit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({
    icon,
    label,
    value,
    unit,
}: {
    icon: ReactNode;
    label: string;
    value: string;
    unit?: string;
}) {
    return (
        <div className="fitness-card p-4">
            <div className="mb-2 flex items-center gap-2 text-[var(--text-2)]">
                <span className="text-[var(--primary)]">{icon}</span>
                <span className="text-sm">{label}</span>
            </div>
            <p className="text-2xl font-bold text-[var(--text)]">
                {value}
                {unit && <span className="ml-1 text-sm font-normal text-[var(--text-2)]">{unit}</span>}
            </p>
        </div>
    );
}

function WeeklyStat({
    label,
    value,
    tone = 'primary',
}: {
    label: string;
    value: string;
    tone?: 'primary' | 'warning' | 'success';
}) {
    const toneClass = {
        primary: 'text-[var(--primary)]',
        warning: 'text-[var(--warning)]',
        success: 'text-[var(--success)]',
    };

    return (
        <div className="text-center">
            <p className={`text-lg font-bold ${toneClass[tone]}`}>{value}</p>
            <p className="text-xs text-[var(--text-2)]">{label}</p>
        </div>
    );
}
