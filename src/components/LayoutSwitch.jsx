import React from 'react';
import { List, LayoutGrid } from 'lucide-react';
import './LayoutSwitch.css';

const LayoutSwitch = ({ layout, setLayout }) => {
  return (
    <div className="layout-switch">
      <button
        className={`layout-button ${layout === 'structured' ? 'active' : ''}`}
        onClick={() => setLayout('structured')}
        aria-pressed={layout === 'structured'}
      >
        <LayoutGrid size={18} />
        <span>Structured</span>
      </button>
      
      <button
        className={`layout-button ${layout === 'roadmap' ? 'active' : ''}`}
        onClick={() => setLayout('roadmap')}
        aria-pressed={layout === 'roadmap'}
      >
        <List size={18} />
        <span>Roadmap</span>
      </button>
    </div>
  );
};

export default LayoutSwitch;