import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./FakeNewsDetector.css";

interface Explanation {
  word: string;
  weight: number;
  support: string;
}

interface AnalysisResult {
  prediction: string;
  confidence: string;
  explanation: Explanation[];
}

const FakeNewsDetector: React.FC = () => {
  const { currentUser } = useAuth();
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);

  // Detect system dark mode preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
  };

  const handleAnalyze = async () => {
    if (!currentUser) {
      setError("Please log in to use this feature");
      return;
    }

    if (text.trim().length < 10) {
      setError("Please enter at least 10 characters");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setAnimateResult(false);

    try {
      const response = await axios.post(
        "/api/detectFakeNews",
        {
          text: text.trim(),
          userId: currentUser.uid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResult({
        prediction: response.data.prediction,
        confidence: response.data.confidence,
        explanation: response.data.explanation,
      });
      
      // Trigger animation after result is set
      setTimeout(() => setAnimateResult(true), 100);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to analyze text"
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setResult(null);
    setError("");
    setCharCount(0);
    setAnimateResult(false);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "#ef4444"; // red
    if (confidence >= 60) return "#f97316"; // orange
    return "#22c55e"; // green
  };

  const getConfidenceGradient = (confidence: number) => {
    if (confidence >= 80) return "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
    if (confidence >= 60) return "linear-gradient(135deg, #f97316 0%, #ea580c 100%)";
    return "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";
  };

  const topExplanations = result?.explanation.slice(0, 5) || [];

  return (
    <div className={`fake-news-detector ${darkMode ? "dark" : "light"}`}>
      <div className="detector-wrapper">
        {/* Header Section */}
        <div className="detector-header">
          <div className="header-content">
            <div className="header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </div>
            <div className="header-text">
              <h1>Fake News Detector</h1>
              <p className="subtitle">
                Advanced AI-powered analysis to detect misinformation
              </p>
            </div>
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle dark mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="detector-container">
          {/* Input Section */}
          <div className="input-section">
            <div className="input-card">
              <div className="input-header">
                <h2>Analyze Text</h2>
                <span className="char-badge">{charCount}/5000</span>
              </div>

              <div className="textarea-wrapper">
                <textarea
                  className="news-textarea"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Paste the news article or text you want to analyze here... (minimum 10 characters)"
                  disabled={loading}
                  maxLength={5000}
                />
                <div className="textarea-accent"></div>
              </div>

              <div className="input-footer">
                <div className="footer-info">
                  <span className="info-item">
                    <span className="info-label">Status:</span>
                    <span className={`info-value ${text.trim().length >= 10 ? "ready" : "pending"}`}>
                      {text.trim().length >= 10 ? "Ready to analyze" : "Minimum 10 characters required"}
                    </span>
                  </span>
                </div>

                <div className="button-group">
                  <button
                    className="btn btn-analyze"
                    onClick={handleAnalyze}
                    disabled={loading || text.trim().length < 10}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <span className="btn-icon">⚡</span>
                        <span>Analyze Now</span>
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-clear"
                    onClick={handleClear}
                    disabled={loading || !text}
                  >
                    <span className="btn-icon">✕</span>
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error">
              <div className="alert-icon">⚠️</div>
              <div className="alert-content">
                <div className="alert-title">Analysis Error</div>
                <div className="alert-message">{error}</div>
              </div>
              <button
                className="alert-close"
                onClick={() => setError("")}
              >
                ✕
              </button>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className={`results-section ${animateResult ? "show" : ""}`}>
              {/* Prediction Card */}
              <div className={`prediction-card prediction-${result.prediction.toLowerCase()}`}>
                <div className="card-header">
                  <h2>Analysis Result</h2>
                </div>

                <div className="prediction-content">
                  <div className="result-badge-container">
                    <div className={`result-badge badge-${result.prediction.toLowerCase()}`}>
                      <span className="badge-icon">
                        {result.prediction === "Fake" ? "🚨" : "✅"}
                      </span>
                      <div className="badge-text">
                        <div className="badge-label">{result.prediction}</div>
                        <div className="badge-desc">
                          {result.prediction === "Fake" ? "Potentially Unreliable" : "Likely Legitimate"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="confidence-container">
                    <div className="confidence-header">
                      <span className="confidence-label">Confidence Score</span>
                      <span className="confidence-percent">{result.confidence}%</span>
                    </div>
                    <div className="confidence-bar-wrapper">
                      <div
                        className="confidence-bar"
                        style={{
                          width: `${result.confidence}%`,
                          background: getConfidenceGradient(
                            parseFloat(result.confidence)
                          ),
                        }}
                      ></div>
                    </div>
                    <div className="confidence-scale">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>

                <div className="insight-box">
                  <div className="insight-icon">💡</div>
                  <div className="insight-text">
                    {result.prediction === "Fake"
                      ? "This content exhibits characteristics commonly found in misinformation. Verify facts through reliable, independent sources before sharing."
                      : "This content appears consistent with legitimate news sources. However, always cross-reference key facts across multiple trusted sources."}
                  </div>
                </div>
              </div>

              {/* Key Factors Card */}
              {topExplanations.length > 0 && (
                <div className="factors-card">
                  <div className="card-header">
                    <h2>Key Contributing Factors</h2>
                    <span className="factor-count">{topExplanations.length} factors</span>
                  </div>

                  <p className="factors-description">
                    Words and phrases that most influenced this prediction:
                  </p>

                  <div className="factors-grid">
                    {topExplanations.map((exp, index) => (
                      <div key={index} className="factor-item">
                        <div className="factor-header">
                          <span className="factor-word">{exp.word}</span>
                          <span className={`factor-support support-${exp.support.toLowerCase()}`}>
                            {exp.support === "Fake" ? "🚨" : "✓"} {exp.support}
                          </span>
                        </div>
                        <div className="factor-weight">
                          <div className="weight-bar">
                            <div 
                              className="weight-fill"
                              style={{
                                width: `${Math.min(exp.weight * 100, 100)}%`
                              }}
                            ></div>
                          </div>
                          <span className="weight-value">{exp.weight.toFixed(4)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analysis Stats */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-content">
                    <div className="stat-label">Text Length</div>
                    <div className="stat-value">{text.length} chars</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">🔍</div>
                  <div className="stat-content">
                    <div className="stat-label">Factors Analyzed</div>
                    <div className="stat-value">{result.explanation.length}</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">⏱️</div>
                  <div className="stat-content">
                    <div className="stat-label">Analysis Speed</div>
                    <div className="stat-value">Real-time</div>
                  </div>
                </div>
              </div>

              {/* Clear Results Button */}
              <div className="results-footer">
                <button className="btn btn-new-analysis" onClick={handleClear}>
                  <span className="btn-icon">🔄</span>
                  <span>Analyze Another Text</span>
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!result && !loading && text.trim().length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔎</div>
              <h3>Ready to Analyze</h3>
              <p>Paste your text above and click "Analyze Now" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FakeNewsDetector;
