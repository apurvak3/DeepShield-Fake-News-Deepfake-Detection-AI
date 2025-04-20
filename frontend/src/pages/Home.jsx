import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1>🛡️ DeepShield</h1>
        <p>Your Guardian Against Deceptive Media - Detect Fake News, Images, Videos & AI-Generated Audio</p>
        
        <div className="modules">
          <Link to="/news">
            📰 Fake News Detection
          </Link>
          <Link to="/image">
            🖼️ Fake Image Detection
          </Link>
          <Link to="/video">
            🎥 Deepfake Video Analysis
          </Link>
          <Link to="/audio">
            🔊 AI-Generated Audio Detection
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
