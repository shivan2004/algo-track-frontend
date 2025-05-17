import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useQueryClient } from 'react-query';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check URL parameters for OAuth redirect
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    const roles = url.searchParams.get('roles');
    const isVerified = url.searchParams.get('isVerified');

    if (token && roles) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          const userRoles = JSON.parse(roles.replace(/\?/g, ''));
          localStorage.setItem('accessToken', token);
          localStorage.setItem('userRoles', JSON.stringify(userRoles));

          setUser({
            token,
            roles: userRoles
          });
          setIsAuthenticated(true);
          setIsAdmin(userRoles.includes('ADMIN'));

          // Clean up URL parameters
          window.history.replaceState({}, document.title, '/');
        }
      } catch (error) {
        console.error('Error processing OAuth redirect:', error);
      }
    } else {
      // Regular token check
      const storedToken = localStorage.getItem('accessToken');
      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp > currentTime) {
            const userRoles = localStorage.getItem('userRoles')
                ? JSON.parse(localStorage.getItem('userRoles'))
                : [];

            setUser({
              token: storedToken,
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
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRoles');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    queryClient.clear();
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            isAuthenticated,
            isAdmin,
            loading,
            logout: handleLogout
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

export default AuthContext;