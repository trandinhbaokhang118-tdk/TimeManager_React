import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    login: (user: User, accessToken: string, refreshToken: string) => void;
    logout: () => void;
    checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user) => set({ user, isAuthenticated: !!user }),

            login: (user, accessToken, refreshToken) => {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                set({ user, isAuthenticated: true });
            },

            logout: () => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                set({ user: null, isAuthenticated: false });
            },

            // Check if tokens exist and sync state
            checkAuth: () => {
                const hasAccessToken = !!localStorage.getItem('accessToken');
                const hasRefreshToken = !!localStorage.getItem('refreshToken');
                const currentState = get();

                // If tokens exist but state says not authenticated, sync it
                if ((hasAccessToken || hasRefreshToken) && !currentState.isAuthenticated && currentState.user) {
                    set({ isAuthenticated: true });
                }

                // If no tokens but state says authenticated, clear it
                if (!hasAccessToken && !hasRefreshToken && currentState.isAuthenticated) {
                    set({ user: null, isAuthenticated: false });
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);

// Sync auth state on app load
if (typeof window !== 'undefined') {
    useAuthStore.getState().checkAuth();
}
