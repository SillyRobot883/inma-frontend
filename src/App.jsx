import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Login from './pages/Login';
import Clubs from './pages/Clubs';
import Dashboard from './pages/Dashboard';
import HRDashboard from './pages/HRDashboard';
import CollegeAdminDashboard from './pages/CollegeAdminDashboard';
import InmaAdminDashboard from './pages/InmaAdminDashboard';
import TaskSubmission from './pages/TaskSubmission';
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
                ? '/inma-admin'
                : user.role === 'college_admin'
                ? '/college-admin'
                : `/dashboard/${currentClub?.id}`
            ) : '/login'} replace />
          } />
          <Route path="/login" element={<Login />} />
          
          {/* College Admin Routes */}
          <Route
            path="/college-admin"
            element={
              <ProtectedRoute allowedRoles={['college_admin']}>
                <CollegeAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/college-admin/clubs"
            element={
              <ProtectedRoute allowedRoles={['college_admin']}>
                <Clubs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/college-admin/reports"
            element={
              <ProtectedRoute allowedRoles={['college_admin']}>
                <div>College Admin Reports</div>
              </ProtectedRoute>
            }
          />

          {/* Inma Admin Routes */}
          <Route
            path="/inma-admin"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <InmaAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inma-admin/clubs"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <Clubs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inma-admin/reports"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <div>Inma Admin Reports</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/inma-admin/users"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <div>User Management</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/inma-admin/settings"
            element={
              <ProtectedRoute allowedRoles={['inma_admin']}>
                <div>System Settings</div>
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
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App; 