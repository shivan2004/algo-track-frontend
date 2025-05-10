import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import './LoginPrompt.css';

const LoginPrompt = ({ onClose }) => {
  return (
    <div className="login-prompt-backdrop" onClick={onClose}>
      <div className="login-prompt" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        
        <div className="login-prompt-content">
          <h3 className="login-prompt-title">Login Required</h3>
          <p className="login-prompt-message">
            Please login to track your progress and mark problems as solved.
          </p>
          
          <div className="login-prompt-actions">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/signup" className="btn-secondary">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;