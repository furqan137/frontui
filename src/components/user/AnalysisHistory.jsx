import React, { useState, useEffect } from 'react';
import './AnalysisHistory.css';

const AnalysisHistory = () => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch statistics
      const statsResponse = await fetch('http://localhost:5001/stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Fetch history from localStorage
      const savedHistory = localStorage.getItem('analysisHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (err) {
      setError('Failed to load history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
    localStorage.setItem('analysisHistory', JSON.stringify(newHistory));
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
      localStorage.removeItem('analysisHistory');
    }
  };

  if (loading) {
    return (
      <div className="analysis-history">
        <div className="loading">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="analysis-history">
      <div className="history-container">
        <h1>Analysis History</h1>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Analyses</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.fake}</div>
              <div className="stat-label">Fake Detected</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.real}</div>
              <div className="stat-label">Real Detected</div>
            </div>
            {stats.total > 0 && (
              <div className="stat-card">
                <div className="stat-value">
                  {((stats.fake / stats.total) * 100).toFixed(1)}%
                </div>
                <div className="stat-label">Fake Rate</div>
              </div>
            )}
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="history-section">
          <div className="section-header">
            <h2>Recent Analyses</h2>
            {history.length > 0 && (
              <button onClick={handleClear} className="btn-clear-all">
                Clear All
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="empty-state">
              <p>No analysis history yet. Start by analyzing some text!</p>
            </div>
          ) : (
            <div className="history-list">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="item-header">
                    <span className={`badge ${item.prediction.toLowerCase()}`}>
                      {item.prediction}
                    </span>
                    <span className="timestamp">
                      {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="item-text">{item.text.substring(0, 200)}...</p>
                  <div className="item-footer">
                    <span className="confidence">
                      Confidence: {(item.confidence * 100).toFixed(2)}%
                    </span>
                    <button
                      onClick={() => handleDelete(index)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisHistory;
