import { createContext, useContext, useState } from "react";
import { login, logout, register } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  // For testing different roles, change this initial state
  const [user, setUser] = useState({
    id: 1,
    name: 'عبدالعزيز الكثيري',
    role: 'user',
    studentId: '441234567',
    committee: 'لجنة التطوير',
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
  // For actual login
  // const [user, setUser] = useState(() => {
  //   const savedUser = localStorage.getItem("userData");
  //   return savedUser ? JSON.parse(savedUser) : null;
  // });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const handleLogin = async (credentials) => {
    try {
      const { data } = await login(credentials);
      const { token, user } = data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleRegister = async (userData) => {
    try {
      const { token, user } = await register(userData);
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed. Please try again.");
    }
  };

  const switchClub = (clubId) => {
    setUser((prev) => ({
      ...prev,
      selectedClubId: clubId,
    }));
  };

  const currentClub = user?.clubs?.find(
    (club) => club.id === user?.selectedClubId,
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
        switchClub,
        currentClub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
