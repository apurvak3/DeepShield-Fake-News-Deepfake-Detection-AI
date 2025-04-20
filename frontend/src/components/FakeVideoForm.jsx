import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const FakeVideoForm = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create video preview URL
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('video', file);

    try {
      const res = await axios.post('http://localhost:5000/api/fake-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (error) {
      console.error('Error analyzing video:', error);
      alert('Failed to analyze the video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2 className="form-header">🎥 Deepfake Video Detection</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="file" 
              accept="video/*" 
              onChange={handleFileChange}
              className="form-control"
              required
            />
          </div>
          
          {preview && (
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <video 
                src={preview} 
                controls
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '300px', 
                  borderRadius: 'var(--border-radius)'
                }} 
              />
            </div>
          )}
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading || !file}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Video'}
          </button>
        </form>
        
        {result && (
          <div className="result-container">
            <div className={`result ${result.prediction === 'Fake' ? 'fake' : 'real'}`}>
              <h3>Prediction: {result.prediction}</h3>
              <p>Confidence: {result.confidence}%</p>
              <div className="confidence-meter">
                <div 
                  className={`confidence-value ${result.prediction === 'Fake' ? 'fake' : 'real'}`}
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FakeVideoForm;
