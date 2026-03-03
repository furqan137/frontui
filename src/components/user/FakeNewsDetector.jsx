import React, { useState } from 'react';
import './FakeNewsDetector.css';

const FakeNewsDetector = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to analyze text. Make sure the Python API is running on localhost:5001');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setError('');
  };

  return (
    <div className="fake-news-detector">
      <div className="detector-container">
        <h1>Fake News Detector</h1>
        <p className="subtitle">Analyze text content for potential misinformation</p>

        <div className="input-section">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 5000))}
            placeholder="Enter text to analyze (max 5000 characters)..."
            maxLength={5000}
            className="text-input"
          />
          <div className="char-count">{text.length}/5000</div>
        </div>

        <div className="button-group">
          <button
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            className="btn-analyze"
          >
            {loading ? 'Analyzing...' : 'Analyze Text'}
          </button>
          <button
            onClick={handleClear}
            className="btn-clear"
          >
            Clear
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {result && (
          <div className="result-section">
            <div className="confidence-card">
              <h2>Classification Result</h2>
              <div className="classification">
                <span className="label">Prediction:</span>
                <span className={`value ${result.prediction.toLowerCase()}`}>
                  {result.prediction}
                </span>
              </div>

              <div className="confidence-metric">
                <label>Confidence Score</label>
                <div className="confidence-bar">
                  <div
                    className="confidence-fill"
                    style={{
                      width: `${result.confidence * 100}%`,
                      backgroundColor:
                        result.confidence > 0.7
                          ? '#ff4444'
                          : result.confidence > 0.5
                          ? '#ffbb33'
                          : '#00C851',
                    }}
                  />
                </div>
                <span className="confidence-value">
                  {(result.confidence * 100).toFixed(2)}%
                </span>
              </div>
            </div>

            {result.explanation && result.explanation.length > 0 && (
              <div className="explanation-card">
                <h3>Key Factors</h3>
                <div className="factors-list">
                  {result.explanation.map((factor, index) => (
                    <div key={index} className="factor-item">
                      <span className="factor-name">{factor.name}</span>
                      <span className={`factor-weight ${factor.weight > 0 ? 'positive' : 'negative'}`}>
                        {(factor.weight > 0 ? '+' : '') + factor.weight.toFixed(4)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FakeNewsDetector;
