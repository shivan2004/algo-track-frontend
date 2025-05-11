import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AuthPages.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signup, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const result = await signup({ email, fullName, userName, password });

      if (result.success) {
        navigate('/login', { state: { message: 'Account created successfully! Please login.' } });
      } else {
        setErrorMessage(result.error || 'Signup failed. Please try again.');
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
              <h1 className="auth-title">Join AlgoTrack Today</h1>
              <p className="auth-description">
                Create an account to track your progress and take your DSA skills to the next level.
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
                <h2 className="auth-form-title">Create an Account</h2>

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
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                      id="fullName"
                      type="text"
                      className="form-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userName" className="form-label">Username</label>
                  <input
                      id="userName"
                      type="text"
                      className="form-input"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
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
                        <UserPlus size={18} />
                        <span>Sign Up</span>
                      </>
                  )}
                </button>

                <div className="auth-divider">
                  <span>or</span>
                </div>

                <div className="google-auth-container">
                  <a href="http://localhost:8080/oauth2/authorization/google" className="auth-submit-button google-btn">
                    Sign up with Google
                  </a>
                </div>

                <p className="auth-alt-link">
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default SignupPage;