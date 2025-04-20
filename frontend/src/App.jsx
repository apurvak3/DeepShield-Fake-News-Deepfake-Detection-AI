import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FakeNewsForm from './components/FakeNewsForm';
import FakeImageForm from './components/FakeImageForm';
import FakeVideoForm from './components/FakeVideoForm';
import FakeAudioForm from './components/FakeAudioForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<FakeNewsForm />} />
          <Route path="/image" element={<FakeImageForm />} />
          <Route path="/video" element={<FakeVideoForm />} />
          <Route path="/audio" element={<FakeAudioForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

