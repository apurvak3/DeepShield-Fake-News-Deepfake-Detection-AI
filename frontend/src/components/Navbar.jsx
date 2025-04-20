import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛡️ DeepShield
        </Link>
        <div className="navbar-menu">
          <Link to="/news" className={`navbar-item ${isActive('/news')}`}>
            📰 Fake News
          </Link>
          <Link to="/image" className={`navbar-item ${isActive('/image')}`}>
            🖼️ Fake Image
          </Link>
          <Link to="/video" className={`navbar-item ${isActive('/video')}`}>
            🎥 Deepfake Video
          </Link>
          <Link to="/audio" className={`navbar-item ${isActive('/audio')}`}>
            🔊 Fake Audio
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;