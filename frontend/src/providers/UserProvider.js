import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    const { token, user } = userData;

    sessionStorage.setItem('token', token);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('token')
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);