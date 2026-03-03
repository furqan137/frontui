import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
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
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
  };

  const handleAnalyze = async () => {
    if (!user) {
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

    try {
      const response = await axios.post(
        "/api/detectFakeNews",
        {
          text: text.trim(),
          userId: user.uid,
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
  };

  const getPredictionClass = (prediction: string) => {
    return prediction === "Fake" ? "prediction-fake" : "prediction-real";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "#dc3545";
    if (confidence >= 60) return "#ff9800";
    return "#28a745";
  };

  return (
    <div className="fake-news-detector">
      <div className="detector-container">
        <div className="detector-header">
          <h1>Fake News Detector</h1>
          <p className="subtitle">
            Analyze text to detect potential fake news and understand key
            factors
          </p>
        </div>

        <div className="detector-input-section">
          <div className="input-wrapper">
            <label htmlFor="news-text" className="input-label">
              Enter News Text or Article
            </label>
            <textarea
              id="news-text"
              className="news-input"
              value={text}
              onChange={handleTextChange}
              placeholder="Paste the news article, headline, or text you want to analyze here..."
              disabled={loading}
              maxLength={5000}
            />
            <div className="input-footer">
              <span className="char-count">
                {charCount} / 5000 characters
              </span>
            </div>
          </div>

          <div className="button-group">
            <button
              className="btn btn-primary"
              onClick={handleAnalyze}
              disabled={loading || text.trim().length < 10}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Analyzing...
                </>
              ) : (
                "Analyze News"
              )}
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleClear}
              disabled={loading || !text}
            >
              Clear
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            {error}
          </div>
        )}

        {result && (
          <div className="result-section">
            <div className={`prediction-card ${getPredictionClass(result.prediction)}`}>
              <div className="prediction-header">
                <h2>Analysis Result</h2>
              </div>

              <div className="prediction-main">
                <div className="prediction-label">
                  <span className={`badge badge-${result.prediction.toLowerCase()}`}>
                    {result.prediction}
                  </span>
                </div>

                <div className="confidence-section">
                  <div className="confidence-label">Confidence Score</div>
                  <div className="confidence-bar-container">
                    <div
                      className="confidence-bar"
                      style={{
                        width: `${result.confidence}%`,
                        backgroundColor: getConfidenceColor(
                          parseFloat(result.confidence)
                        ),
                      }}
                    ></div>
                  </div>
                  <div className="confidence-value">{result.confidence}%</div>
                </div>
              </div>
            </div>

            <div className="explanation-card">
              <h3 className="explanation-title">
                Key Contributing Factors
              </h3>
              <p className="explanation-subtitle">
                Words and phrases that influenced this prediction:
              </p>

              <div className="explanation-list">
                {result.explanation.map((exp, index) => (
                  <div key={index} className="explanation-item">
                    <div className="explanation-word">
                      <span className="word-text">{exp.word}</span>
                      <span
                        className={`support-badge support-${exp.support.toLowerCase()}`}
                      >
                        {exp.support}
                      </span>
                    </div>
                    <div className="explanation-weight">
                      <span className="weight-value">
                        {exp.weight.toFixed(4)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="result-info-box">
              <h4>What does this mean?</h4>
              <p>
                {result.prediction === "Fake"
                  ? "This text shows characteristics commonly found in fake news. Be cautious and verify information from reliable sources before sharing."
                  : "This text appears to have characteristics of legitimate news. However, it's always good practice to cross-reference facts from multiple sources."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FakeNewsDetector;
