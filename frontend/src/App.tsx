import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './app/queryClient';
import { router } from './app/router';
import { Toaster } from './components/ui/toast';
import { NotificationListener } from './components/notifications/NotificationToast';
import { ErrorBoundary } from './components/ErrorBoundary';

// Import debug utilities in development
if (import.meta.env.DEV) {
  import('./lib/debug');
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
        <NotificationListener />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
