import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './app/router';
import { Toaster } from './components/ui/toast';
import { NotificationListener } from './components/notifications/NotificationToast';
import { ErrorBoundary } from './components/ErrorBoundary';

// Create query client with optimized settings
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 0,
        },
    },
});

// Loading component
function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6] dark:from-[#0A1628] dark:via-[#1E3A5F] dark:to-[#8B5CF6]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent shadow-lg"></div>
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<PageLoader />}>
                    <RouterProvider router={router} />
                </Suspense>
                <Toaster />
                <NotificationListener />
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default App;
