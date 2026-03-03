import React, { useState } from 'react';

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

  const getConfidenceColor = (confidence) => {
    if (confidence > 0.7) return 'from-red-500 to-red-600';
    if (confidence > 0.5) return 'from-amber-500 to-amber-600';
    return 'from-emerald-500 to-emerald-600';
  };

  const getPredictionBg = (prediction) => {
    return prediction === 'Fake' ? 'bg-red-50 dark:bg-red-950' : 'bg-emerald-50 dark:bg-emerald-950';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            Fake News Detector
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Analyze text content for potential misinformation using AI-powered detection
          </p>
        </div>

        {/* Input Section */}
        <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 p-8 shadow-xl mb-6">
          
          {/* Textarea */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
              Text to Analyze
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 5000))}
              placeholder="Enter text to analyze (max 5000 characters)..."
              maxLength={5000}
              className="w-full h-40 p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            />
            <div className="flex justify-end mt-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {text.length}/5000 characters
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </span>
              ) : (
                '🔍 Analyze Text'
              )}
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
            >
              Clear
            </button>
          </div>
        </div>

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

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            
            {/* Main Prediction Card */}
            <div className={`backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 p-8 shadow-xl ${getPredictionBg(result.prediction)}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Classification Result</h2>
                <span className={`text-5xl ${result.prediction === 'Fake' ? 'text-red-600' : 'text-emerald-600'}`}>
                  {result.prediction === 'Fake' ? '🚨' : '✓'}
                </span>
              </div>

              <div className="mb-8">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Prediction</p>
                <div className="inline-block px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                  <p className={`text-2xl font-bold ${result.prediction === 'Fake' ? 'text-red-600' : 'text-emerald-600'}`}>
                    {result.prediction}
                  </p>
                </div>
              </div>

              {/* Confidence Score */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confidence Score</label>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getConfidenceColor(result.confidence)} transition-all duration-1000 ease-out`}
                    style={{ width: `${result.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Key Factors */}
            {result.explanation && result.explanation.length > 0 && (
              <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 p-8 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Key Factors Analysis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.explanation.map((factor, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-l-4 ${
                        factor.weight > 0
                          ? 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                          : 'border-l-amber-500 bg-amber-50 dark:bg-amber-950/30'
                      }`}
                    >
                      <p className="font-semibold text-slate-900 dark:text-white mb-2">{factor.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600 dark:text-slate-400">Weight</span>
                        <span
                          className={`font-bold text-sm ${
                            factor.weight > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {(factor.weight > 0 ? '+' : '') + factor.weight.toFixed(4)}
                        </span>
                      </div>
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
