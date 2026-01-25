// AI Schedule Types

export interface TimeSlot {
    start: string; // "HH:mm"
    end: string;   // "HH:mm"
}

export interface Location {
    id?: string;
    name: string;
    address: string;
    latitude?: number;
    longitude?: number;
    placeId?: string;
}

export interface DailySchedule {
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    slots: Array<{
        start: string;
        end: string;
        activity: string;
        location?: Location;
    }>;
}

export interface FixedActivity {
    id?: string;
    name: string;
    day: string[];
    start: string;
    end: string;
    location?: Location;
    recurring: boolean;
}

export interface SchedulePreferences {
    id?: string;
    userId?: string;

    // Basic info
    wakeUpTime: string;
    sleepTime: string;
    breakfastTime?: string;
    lunchTime?: string;
    dinnerTime?: string;

    // Weekly schedule
    weeklySchedule: DailySchedule[];

    // Fixed activities
    fixedActivities: FixedActivity[];

    // Preferences
    bestFocusTime: 'morning' | 'afternoon' | 'evening' | 'night';
    breakDuration: number; // minutes
    travelBuffer: number;  // minutes

    // Locations
    homeLocation?: Location;
    workLocation?: Location;

    createdAt?: string;
    updatedAt?: string;
}

export interface ScheduleAnalysisRequest {
    preferences: SchedulePreferences;
    tasks: Array<{
        id: string;
        title: string;
        priority: 'LOW' | 'MEDIUM' | 'HIGH';
        dueAt: string;
        estimatedDuration?: number; // minutes
        location?: Location;
    }>;
    startDate: string;
    endDate: string;
}

export interface ScheduleSuggestion {
    taskId: string;
    title: string;
    suggestedStart: string;
    suggestedEnd: string;
    location?: Location;
    travelTime?: number;
    reason: string;
    confidence: number; // 0-100
}

export interface ScheduleAnalysisResponse {
    suggestions: ScheduleSuggestion[];
    freeTimeSlots: Array<{
        start: string;
        end: string;
        duration: number;
    }>;
    conflicts: Array<{
        taskId: string;
        reason: string;
    }>;
    optimizationScore: number; // 0-100
}

export interface WizardStep {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}
