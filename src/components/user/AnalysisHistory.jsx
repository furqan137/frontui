import React, { useState, useEffect } from 'react';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            Analysis History
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            View your past analyses and statistics
          </p>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-6 text-center">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stats.total}
              </p>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Total Analyses
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-6 text-center">
              <p className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                {stats.fake}
              </p>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Fake Detected
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-6 text-center">
              <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                {stats.real}
              </p>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Real Detected
              </p>
            </div>

            {stats.total > 0 && (
              <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-6 text-center">
                <p className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                  {((stats.fake / stats.total) * 100).toFixed(1)}%
                </p>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Fake Rate
                </p>
              </div>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold text-red-900 dark:text-red-200">Error</p>
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Recent Analyses */}
        <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              📝 Recent Analyses
            </h2>
            {history.length > 0 && (
              <button
                onClick={handleClear}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800 transition"
              >
                🗑️ Clear All
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">📭</p>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No analysis history yet. Start by analyzing some text!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 transition hover:shadow-md ${
                    item.prediction === 'Fake'
                      ? 'border-l-red-500 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30'
                      : 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                          item.prediction === 'Fake'
                            ? 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100'
                            : 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100'
                        }`}
                      >
                        {item.prediction === 'Fake' ? '🚨' : '✓'} {item.prediction}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(item.timestamp).toLocaleDateString()} at{' '}
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 line-clamp-2">
                    "{item.text.substring(0, 150)}{item.text.length > 150 ? '...' : ''}"
                  </p>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-slate-600 dark:text-slate-400">
                      📊 Confidence: <span className="font-bold text-slate-900 dark:text-white">{(item.confidence * 100).toFixed(1)}%</span>
                    </span>
                    {item.category && (
                      <span className="text-slate-600 dark:text-slate-400">
                        🎯 {item.category}
                      </span>
                    )}
                    {item.location && (
                      <span className="text-slate-600 dark:text-slate-400">
                        📍 {item.location}
                      </span>
                    )}
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
