import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import TestOverlay from './components/TestOverlay';
import { Toaster } from './components/ui/toaster';
import { useAuth } from './context/AuthContext';
import AdminMemberManagement from './pages/AdminMemberManagement';
import ClubDetails from './pages/ClubDetails';
import Clubs from './pages/Clubs';
import ClubsSelection from './pages/ClubsSelection';
import CollegeAdminDashboard from './pages/CollegeAdminDashboard';
import Dashboard from './pages/Dashboard';
import HRDashboard from './pages/HRDashboard';
import InmaAdminDashboard from './pages/InmaAdminDashboard';
import Login from './pages/Login';
import MemberManagement from './pages/MemberManagement';
import TaskSubmission from './pages/TaskSubmission';
import VolunteerHoursLog from './pages/VolunteerHoursLog';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, currentClub } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // For college and inma admins
  if (user.role === 'college_admin' || user.role === 'inma_admin') {
    return children;
  }

  // For club members, check if they have access to the current club
  const hasClubAccess = user.clubs.some(
    (club) => club.id.toString() === currentClub?.id?.toString()
  );
  if (!hasClubAccess) {
    return <Navigate to="/clubs-selection" replace />;
  }

  // If no specific roles are required, or user's role in current club is in allowed roles
  if (allowedRoles.length === 0 || allowedRoles.includes(currentClub.role)) {
    return children;
  }

  // Redirect to clubs selection if user doesn't have required role
  return <Navigate to="/clubs-selection" replace />;
};

function App() {
  const { user, currentClub } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sst">
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={
                  user
                    ? user.role === 'inma_admin'
                      ? '/inma-dashboard'
                      : user.role === 'college_admin'
                        ? '/college-dashboard'
                        : '/clubs-selection'
                    : '/login'
                }
                replace
              />
            }
          />
          <Route />
          <Route path="/login" element={<Login />} />
          <Route path="/clubs-selection" element={<ClubsSelection />} />

          {/* College Admin Routes */}
          <Route
            path="/college-dashboard"
            element={
              <ProtectedRoute allowedRoles={['college_admin']}>
                <CollegeAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/college-dashboard/clubs"
            element={
              <ProtectedRoute allowedRoles={['college_admin']}>
                <Clubs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/college-dashboard/club/:clubId"
            element={
              <ProtectedRoute allowedRoles={['college_admin']}>
                <ClubDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/college-dashboard/users"
            element={
              <ProtectedRoute allowedRoles={['college_admin']}>
                <AdminMemberManagement isInmaAdmin={false} />
              </ProtectedRoute>
            }
          />

          {/* Inma Admin Routes */}
          <Route
            path="/inma-dashboard"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <InmaAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inma-dashboard/clubs"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <Clubs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inma-dashboard/users"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <AdminMemberManagement isInmaAdmin={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inma-dashboard/settings"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <div>System Settings</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/inma-dashboard/club/:clubId"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <ClubDetails />
              </ProtectedRoute>
            }
          />

          {/* Club Member Routes */}
          <Route
            path="/dashboard/:clubId"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/club/:clubId"
            element={
              <ProtectedRoute>
                <ClubDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr-dashboard/:clubId"
            element={
              <ProtectedRoute allowedRoles={['hr', 'leader']}>
                <HRDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/task-submission/:clubId"
            element={
              <ProtectedRoute allowedRoles={['member', 'hr', 'leader']}>
                <TaskSubmission />
              </ProtectedRoute>
            }
          />
          <Route
            path="/volunteer-hours/:clubId"
            element={
              <ProtectedRoute>
                <VolunteerHoursLog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/member-management/:clubId"
            element={
              <ProtectedRoute allowedRoles={['hr', 'leader']}>
                <MemberManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
        <TestOverlay />
      </div>
    </Router>
  );
}

export default App;
