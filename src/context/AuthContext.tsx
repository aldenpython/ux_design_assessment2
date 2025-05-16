
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  const login = () => {
    setIsLoggedIn(true);
  };
  
  const logout = async (): Promise<void> => {
    try {
      // Simulate an async operation (e.g., calling an API to log out)
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setIsLoggedIn(false);
          resolve();
        }, 300);
      });
      
      // Show success message
      toast.success("Successfully logged out");
    } catch (error) {
      // Handle any errors that occur during logout
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
      throw error; // Rethrow the error so it can be handled by the component if needed
    }
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
