import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const FakeAudioForm = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create audio preview URL
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('audio', file);

    try {
      const res = await axios.post('http://localhost:5000/api/fake-audio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (error) {
      console.error('Error analyzing audio:', error);
      alert('Failed to analyze the audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2 className="form-header">🔊 AI-Generated Audio Detection</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="file" 
              accept="audio/*" 
              onChange={handleFileChange}
              className="form-control"
              required
            />
          </div>
          
          {preview && (
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <audio 
                src={preview} 
                controls
                style={{ width: '100%' }} 
              />
            </div>
          )}
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading || !file}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Audio'}
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

export default FakeAudioForm;
