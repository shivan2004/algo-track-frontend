import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Code } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
      <header className="header">
        <div className="container-custom">
          <div className="header-content">
            <Link to="/" className="logo-container">
              <Code className="logo-icon" size={24} />
              <h1 className="logo-text">AlgoTrack</h1>
            </Link>

            <nav className="nav-links">
              <Link to="/" className="nav-link">Home</Link>

              <button
                  onClick={toggleTheme}
                  className="theme-toggle"
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {isAuthenticated ? (
                  <>
                    {isAdmin && (
                        <Link to="/admin" className="nav-link">Admin</Link>
                    )}
                    <button onClick={handleLogout} className="nav-link">Logout</button>
                  </>
              ) : (
                  <Link to="/auth" className="btn-primary">Get Started</Link>
              )}
            </nav>
          </div>
        </div>
      </header>
  );
}

export default Header;