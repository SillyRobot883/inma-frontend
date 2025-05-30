import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import ClubsPage from '@/pages/clubs/ClubsPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import EventsPage from '@/pages/events/EventsPage';

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'));

const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="flex items-center space-x-3 space-x-reverse">
      <div className="border-trust-blue h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
      <span className="text-muted-foreground">جاري التحميل...</span>
    </div>
  </div>
);

function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="clubs" element={<ClubsPage />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default AppRouter;
