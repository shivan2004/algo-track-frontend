import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useQueryClient } from 'react-query';
import { login, signup } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          const userRoles = localStorage.getItem('userRoles')
              ? JSON.parse(localStorage.getItem('userRoles'))
              : [];

          setUser({
            token,
            roles: userRoles
          });
          setIsAuthenticated(true);
          setIsAdmin(userRoles.includes('ADMIN'));
        } else {
          handleLogout();
        }
      } catch (error) {
        handleLogout();
      }
    }

    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      const { accessToken, roles } = response;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userRoles', JSON.stringify(roles));

      setUser({ token: accessToken, roles });
      setIsAuthenticated(true);
      setIsAdmin(roles.includes('ADMIN'));

      return { success: true, isAdmin: roles.includes('ADMIN') };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Login failed'
      };
    }
  };

  const handleSignup = async (userData) => {
    try {
      await signup(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Signup failed'
      };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRoles');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    queryClient.clear(); // Clear all React Query cache
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            isAuthenticated,
            isAdmin,
            loading,
            login: handleLogin,
            signup: handleSignup,
            logout: handleLogout
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

export default AuthContext;