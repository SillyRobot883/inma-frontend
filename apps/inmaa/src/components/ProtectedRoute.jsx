import { Navigate } from 'react-router-dom';

// Dummy auth context - will be replaced with real auth later
const useAuth = () => {
  // This is dummy data for now
  return {
    user: {
      id: 1,
      name: 'John Doe',
      role: 'inma_admin',
      clubId: 1,
    },
    isAuthenticated: true,
  };
};

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.clubId}`} />;
  }

  return children;
};

export default ProtectedRoute;
