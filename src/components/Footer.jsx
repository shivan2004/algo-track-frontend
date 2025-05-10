import React from 'react';
import { Github, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-custom footer-content">
        <div className="footer-left">
          <p>© {new Date().getFullYear()} AlgoTrack. All rights reserved.</p>
        </div>
        
        <div className="footer-right">
          <a href="https://github.com" className="footer-link" target="_blank" rel="noopener noreferrer">
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <p className="footer-made-with">
            Made with <Heart size={14} className="heart-icon" /> for DSA learners
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;