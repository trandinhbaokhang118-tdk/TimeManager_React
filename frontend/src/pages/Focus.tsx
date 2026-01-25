import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Settings2, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '../components/ui';
import { cn } from '../lib/utils';
import { showToast } from '../components/ui/toast';

type SessionType = 'focus' | 'shortBreak' | 'longBreak';

const DEFAULT_TIMES = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
};

export function Focus() {
    const [sessionType, setSessionType] = useState<SessionType>('focus');
    const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMES.focus);
    const [isRunning, setIsRunning] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const [zenMode, setZenMode] = useState(false);

    const totalTime = DEFAULT_TIMES[sessionType];
    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleComplete = useCallback(() => {
        setIsRunning(false);
        if (sessionType === 'focus') {
            setSessionsCompleted((prev) => prev + 1);
            showToast.success('Phiên Focus hoàn thành!', 'Nghỉ ngơi một chút nhé');
            // Auto switch to break
            if ((sessionsCompleted + 1) % 4 === 0) {
                setSessionType('longBreak');
                setTimeLeft(DEFAULT_TIMES.longBreak);
            } else {
                setSessionType('shortBreak');
                setTimeLeft(DEFAULT_TIMES.shortBreak);
            }
        } else {
            showToast.info('Hết giờ nghỉ!', 'Sẵn sàng cho phiên Focus tiếp theo');
            setSessionType('focus');
            setTimeLeft(DEFAULT_TIMES.focus);
        }
    }, [sessionType, sessionsCompleted]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleComplete();
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, timeLeft, handleComplete]);

    const toggleTimer = () => setIsRunning(!isRunning);

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(DEFAULT_TIMES[sessionType]);
    };

    const switchSession = (type: SessionType) => {
        setSessionType(type);
        setTimeLeft(DEFAULT_TIMES[type]);
        setIsRunning(false);
    };

    const sessionColors = {
        focus: 'from-cyan-500 via-blue-500 to-purple-600',
        shortBreak: 'from-emerald-500 via-green-500 to-teal-600',
        longBreak: 'from-blue-500 via-indigo-500 to-violet-600',
    };

    const sessionLabels = {
        focus: 'Focus',
        shortBreak: 'Nghỉ ngắn',
        longBreak: 'Nghỉ dài',
    };

    if (zenMode) {
        return (
            <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#0F1F3A] via-[#1A2942] to-[#0A1628] flex items-center justify-center">
                <button
                    onClick={() => setZenMode(false)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                >
                    <Minimize2 className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <p className="text-gray-300 text-lg mb-6 tracking-wide">{sessionLabels[sessionType]}</p>
                    <p className="text-8xl font-bold text-white font-mono mb-8 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                        {formatTime(timeLeft)}
                    </p>
                    <Button
                        size="lg"
                        onClick={toggleTimer}
                        className={cn(
                            'w-30 h-30 rounded-full transition-all',
                            isRunning
                                ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)]'
                                : 'bg-gradient-to-r from-[#12C2FF] to-[#3B82F6] hover:from-[#3DD6FF] hover:to-[#60A5FA] text-white shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                        )}
                    >
                        {isRunning ? (
                            <Pause className="w-8 h-8" />
                        ) : (
                            <Play className="w-8 h-8 ml-1 fill-white" />
                        )}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-20 md:pb-0">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text)]">Focus Mode</h1>
                    <p className="text-[var(--text-2)]">Tập trung làm việc với Pomodoro</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setZenMode(true)}>
                    <Maximize2 className="w-5 h-5" />
                </Button>
            </div>

            {/* Session Type Tabs */}
            <div className=" flex gap-2 p-1 bg-blue-400 border border-[var(--border)] rounded-xl backdrop-blur-xl ">
                {(['focus', 'shortBreak', 'longBreak'] as SessionType[]).map((type) => (
                    <button
                        key={type}
                        onClick={() => switchSession(type)}
                        className={cn(
                            'flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all',
                            sessionType === type
                                ? 'bg-[var(--surface-2)] text-[var(--text)] shadow-sm'
                                : 'text-[var(--text-2)] hover:text-[var(--text)]'
                        )}
                    >
                        {type === 'focus' && <Brain className="w-4 h-4 inline mr-1.5" />}
                        {type === 'shortBreak' && <Coffee className="w-4 h-4 inline mr-1.5" />}
                        {type === 'longBreak' && <Coffee className="w-4 h-4 inline mr-1.5" />}
                        {sessionLabels[type]}
                    </button>
                ))}
            </div>

            {/* Timer */}
            <div className={cn('bg-[var(--surface-1)] border border-[var(--border)] shadow-[var(--shadow-lg)] rounded-xl backdrop-blur-xl p-8 text-center bg-gradient-to-br', sessionColors[sessionType])}>
                {/* Progress Ring */}
                <div className="relative w-64 h-64 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="128"
                            cy="128"
                            r="120"
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="8"
                        />
                        <circle
                            cx="128"
                            cy="128"
                            r="120"
                            fill="none"
                            stroke="white"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 120}
                            strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                            className="transition-all duration-1000"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white font-mono">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={resetTimer}
                        className="text-white/80 hover:text-white hover:bg-white/10"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                    <Button
                        size="lg"
                        onClick={toggleTimer}
                        className={cn(
                            'w-26 h-16 rounded-full shadow-lg',
                            isRunning
                                ? 'bg-white/20 hover:bg-white/30 text-white'
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                        )}
                    >
                        {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1 fill-white" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/80 hover:text-white hover:bg-white/10"
                    >
                        <Settings2 className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-[var(--surface-1)] border border-[var(--border)] shadow-[var(--shadow-md)] rounded-xl backdrop-blur-xl p-4 text-center hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all">
                    <p className="text-3xl font-bold text-[var(--text)]">{sessionsCompleted}</p>
                    <p className="text-sm text-[var(--text-2)]">Phiên hôm nay</p>
                </div>
                <div className="bg-[var(--surface-1)] border border-[var(--border)] shadow-[var(--shadow-md)] rounded-xl backdrop-blur-xl p-4 text-center hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all">
                    <p className="text-3xl font-bold text-[var(--text)]">
                        {Math.round((sessionsCompleted * 25) / 60 * 10) / 10}h
                    </p>
                    <p className="text-sm text-[var(--text-2)]">Thời gian focus</p>
                </div>
                <div className="bg-[var(--surface-1)] border border-[var(--border)] shadow-[var(--shadow-md)] rounded-xl backdrop-blur-xl p-4 text-center hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all">
                    <p className="text-3xl font-bold text-[var(--text)]">
                        {4 - (sessionsCompleted % 4)}
                    </p>
                    <p className="text-sm text-[var(--text-2)]">Đến nghỉ dài</p>
                </div>
            </div>

            {/* Tips */}
            <div className="bg-[var(--surface-1)] border border-[var(--border)] shadow-[var(--shadow-md)] rounded-xl backdrop-blur-xl p-4">
                <h3 className="font-medium text-[var(--text)] mb-2">💡 Mẹo Focus</h3>
                <ul className="text-sm text-[var(--text-2)] space-y-1">
                    <li>• Tắt thông báo điện thoại trong phiên focus</li>
                    <li>• Uống nước trong giờ nghỉ</li>
                    <li>• Đứng dậy vận động sau mỗi 4 phiên</li>
                </ul>
            </div>
        </div>
    );
}
