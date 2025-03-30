import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Login from './pages/Login';
import Clubs from './pages/Clubs';
import Dashboard from './pages/Dashboard';
import HRDashboard from './pages/HRDashboard';
import CollegeAdminDashboard from './pages/CollegeAdminDashboard';
import InmaAdminDashboard from './pages/InmaAdminDashboard';
import TaskSubmission from './pages/TaskSubmission';
import ClubDetails from './pages/ClubDetails';
import VolunteerHoursLog from './pages/VolunteerHoursLog';
import MemberManagement from './pages/MemberManagement';
import { useAuth } from './context/AuthContext';

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
  const hasClubAccess = user.clubs.some(club => club.id.toString() === currentClub?.id?.toString());
  if (!hasClubAccess) {
    return <Navigate to={`/dashboard/${user.clubs[0].id}`} replace />;
  }

  // If no specific roles are required, or user's role in current club is in allowed roles
  if (allowedRoles.length === 0 || allowedRoles.includes(currentClub.role)) {
    return children;
  }

  // Redirect to dashboard if user doesn't have required role
  return <Navigate to={`/dashboard/${currentClub.id}`} replace />;
};

function App() {
  const { user, currentClub } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sst">
        <Routes>
          <Route path="/" element={
            <Navigate to={user ? (
              user.role === 'inma_admin' 
                ? '/inma-dashboard'
                : user.role === 'college_admin'
                ? '/college-dashboard'
                : `/dashboard/${currentClub?.id}`
            ) : '/login'} replace />
          } />
          <Route path="/login" element={<Login />} />

          {/* College Admin Routes */}
          <Route
            path="/college-dashboard"
            path="/college-dashboard"
            element={
              <ProtectedRoute allowedRoles={['college_admin']}>
                <CollegeAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/college-dashboard/clubs"
            path="/college-dashboard/clubs"
            element={
              <ProtectedRoute allowedRoles={['college_admin']}>
                <Clubs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/college-dashboard/reports"
            path="/college-dashboard/reports"
            element={
              <ProtectedRoute allowedRoles={['college_admin']}>
                <div>College Admin Reports</div>
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
            path="/college-dashboard/club/:clubId"
            element={
              <ProtectedRoute allowedRoles={['college_admin']}>
                <ClubDetails />
              </ProtectedRoute>
            }
          />

          {/* Inma Admin Routes */}
          <Route
            path="/inma-dashboard"
            path="/inma-dashboard"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <InmaAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inma-dashboard/clubs"
            path="/inma-dashboard/clubs"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <Clubs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inma-dashboard/reports"
            path="/inma-dashboard/reports"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <div>Inma Admin Reports</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/inma-dashboard/users"
            path="/inma-dashboard/users"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <div>User Management</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/inma-dashboard/settings"
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
              <ProtectedRoute allowedRoles={['member', 'hr', 'leader', 'inma_admin', 'college_admin']}>
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
      </div>
    </Router>
  );
}

export default App; 