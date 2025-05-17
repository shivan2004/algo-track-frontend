import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AuthPages.css';
import {API_URL} from "../services/api.js";

const LoginPage = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
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
              <div className="auth-form">
                <h2 className="auth-form-title">Login to Your Account</h2>

                <div className="oauth-buttons">
                  <a href={`${API_URL}/oauth2/authorization/google`} className="auth-submit-button google-btn">

                  Continue with Google
                  </a>

                  <a href={`${API_URL}/oauth2/authorization/github`} className="auth-submit-button google-btn">

                  Continue with GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default LoginPage;

