import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const FakeNewsForm = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/fake-news', { text: input });
      setResult(res.data);
    } catch (error) {
      console.error('Error analyzing text:', error);
      alert('Failed to analyze the text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2 className="form-header">📰 Fake News Detection</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea 
              className="form-control"
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Enter news article text to analyze..."
              required
            />
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Text'}
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

export default FakeNewsForm;
