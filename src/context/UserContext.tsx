import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'buyer' | 'seller';
  profile: {
    avatar?: string;
    company?: string;
    industry?: string;
    experience?: number;
    location?: string;
    bio?: string;
  };
  onboarding: {
    completed: boolean;
    currentStep: number;
    totalSteps: number;
  };
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User['profile']>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User['profile']>) => {
    if (user) {
      setUser({
        ...user,
        profile: {
          ...user.profile,
          ...updates,
        },
      });
    }
  };

  const value: UserContextType = {
    user,
    setUser,
    isAuthenticated: !!user,
    login,
    logout,
    updateProfile,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
