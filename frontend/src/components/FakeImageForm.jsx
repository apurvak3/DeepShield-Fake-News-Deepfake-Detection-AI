import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const FakeImageForm = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/api/fake-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Failed to analyze the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2 className="form-header">🖼️ Fake Image Detection</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="form-control"
              required
            />
          </div>
          
          {preview && (
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img 
                src={preview} 
                alt="Selected preview" 
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
            {isLoading ? 'Analyzing...' : 'Analyze Image'}
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

export default FakeImageForm;
