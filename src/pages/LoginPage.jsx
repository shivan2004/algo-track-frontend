import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AuthPages.css';
import {API_URL} from '../services/api.js'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const result = await login({ email, password });

      if (result.success) {
        if (result.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setErrorMessage(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="auth-page">
        <Header />

        <main className="auth-container">
          <div className="auth-content">
            <div className="auth-info">
              <h1 className="auth-title">Welcome to AlgoTrack</h1>
              <p className="auth-description">
                Track your progress, mark solved problems, and master data structures & algorithms with a structured approach.
              </p>
              <div className="auth-features">
                <div className="auth-feature">
                  <div className="auth-feature-icon">📊</div>
                  <div className="auth-feature-text">Track your progress with detailed statistics</div>
                </div>
                <div className="auth-feature">
                  <div className="auth-feature-icon">📝</div>
                  <div className="auth-feature-text">Access curated problem sets organized by topic</div>
                </div>
                <div className="auth-feature">
                  <div className="auth-feature-icon">🚀</div>
                  <div className="auth-feature-text">Prepare effectively for technical interviews</div>
                </div>
              </div>
            </div>

            <div className="auth-form-container">
              <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-form-title">Login to Your Account</h2>

                {errorMessage && (
                    <div className="auth-error">
                      {errorMessage}
                    </div>
                )}

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                      id="email"
                      type="email"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="password-input-container">
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="form-input password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                    type="submit"
                    className="auth-submit-button"
                    disabled={isLoading}
                >
                  {isLoading ? (
                      <span className="loading-spinner"></span>
                  ) : (
                      <>
                        <LogIn size={18} />
                        <span>Login</span>
                      </>
                  )}
                </button>

                <div className="auth-divider">
                  <span>or</span>
                </div>

                <div className="google-auth-container">
                  <a href={`${API_URL}/oauth2/authorization/google`} className="auth-submit-button google-btn">
                    Login with Google
                  </a>
                </div>

                <p className="auth-alt-link">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default LoginPage;