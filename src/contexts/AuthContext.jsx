
import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '@/lib/auth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    authService.getSession().then(({ user }) => {
      setUser(user);
      setLoading(false);
    });

    // Subscribe to auth changes
    const unsubscribe = authService.subscribe((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    return authService.signIn(email, password);
  };

  const signUp = async (email, password, userData) => {
    return authService.signUp(email, password, userData);
  };

  const signOut = async () => {
    return authService.signOut();
  };

  const updateProfile = async (updates) => {
    return authService.updateProfile(updates);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: authService.isAdmin(),
    hasRole: authService.hasRole.bind(authService)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
