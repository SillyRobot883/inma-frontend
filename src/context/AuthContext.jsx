import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // For testing different roles, change this initial state
  const [user, setUser] = useState({
    id: 1,
    name: 'عبدالعزيز الكثيري',
    role: 'college_admin',
    clubs: [
      {
        id: 1,
        name: 'نادي تيكنيشن',
        role: 'hr'
      },
      {
        id: 2,
        name: 'نادي الابتكار',
        role: 'member'
      },
      {
        id: 3,
        name: 'نادي التصميم',
        role: 'member'
      }
    ],
    selectedClubId: 1 // Default selected club
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (credentials) => {
    // This will be replaced with actual API call
    console.log('Logging in with:', credentials);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const switchClub = (clubId) => {
    setUser(prev => ({
      ...prev,
      selectedClubId: clubId
    }));
  };

  // Get current club details
  const currentClub = user?.clubs?.find(club => club.id === user?.selectedClubId);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      switchClub,
      currentClub
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 