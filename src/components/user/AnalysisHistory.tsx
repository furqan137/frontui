import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./AnalysisHistory.css";

interface Explanation {
  word: string;
  weight: number;
  support: string;
}

interface AnalysisRecord {
  id: string;
  text: string;
  prediction: string;
  confidence: number;
  explanation: Explanation[];
  timestamp: any;
}

const AnalysisHistory: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchHistory();
      fetchStats();
    }
  }, [user]);

  const fetchHistory = async () => {
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `/api/analysisHistory?userId=${user.uid}`
      );

      setHistory(response.data.history || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch history"
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    if (!user) return;

    try {
      const response = await axios.get(
        `/api/analysisStats?userId=${user.uid}`
      );

      setStats(response.data.stats);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const handleDelete = async (analysisId: string) => {
    if (!user) return;

    if (!window.confirm("Are you sure you want to delete this analysis?")) {
      return;
    }

    try {
      await axios.delete(
        `/api/deleteAnalysis?analysisId=${analysisId}&userId=${user.uid}`
      );

      setHistory(history.filter((item) => item.id !== analysisId));
      await fetchStats();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to delete analysis");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown date";

    try {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Unknown date";
    }
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
    <div className="analysis-history">
      <div className="history-container">
        <div className="history-header">
          <h1>Analysis History</h1>
          <p className="subtitle">View your past fake news detections</p>
        </div>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.totalAnalyses}</div>
              <div className="stat-label">Total Analyses</div>
            </div>
            <div className="stat-card stat-fake">
              <div className="stat-number">{stats.fakeCount}</div>
              <div className="stat-label">Fake Detected</div>
            </div>
            <div className="stat-card stat-real">
              <div className="stat-number">{stats.realCount}</div>
              <div className="stat-label">Real Detected</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.averageConfidence}%</div>
              <div className="stat-label">Avg. Confidence</div>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            {error}
          </div>
        )}

        <div className="history-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading your analysis history...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No analyses yet</h3>
              <p>Start analyzing news to build your detection history</p>
            </div>
          ) : (
            <div className="history-list">
              {history.map((item) => (
                <div
                  key={item.id}
                  className={`history-item ${getPredictionClass(item.prediction)}`}
                >
                  <div className="item-header">
                    <div className="item-title-section">
                      <span
                        className={`badge badge-${item.prediction.toLowerCase()}`}
                      >
                        {item.prediction}
                      </span>
                      <div className="item-text-preview">
                        {item.text.substring(0, 100)}
                        {item.text.length > 100 ? "..." : ""}
                      </div>
                    </div>
                    <div className="item-meta">
                      <span className="confidence-badge">
                        {item.confidence.toFixed(1)}%
                      </span>
                      <span className="date-badge">
                        {formatDate(item.timestamp)}
                      </span>
                      <button
                        className="btn-expand"
                        onClick={() =>
                          setExpandedId(
                            expandedId === item.id ? null : item.id
                          )
                        }
                      >
                        {expandedId === item.id ? "▼" : "▶"}
                      </button>
                    </div>
                  </div>

                  {expandedId === item.id && (
                    <div className="item-details">
                      <div className="full-text-section">
                        <h4>Full Text</h4>
                        <div className="full-text">{item.text}</div>
                      </div>

                      <div className="confidence-section">
                        <h4>Confidence Score</h4>
                        <div className="confidence-bar-container">
                          <div
                            className="confidence-bar"
                            style={{
                              width: `${item.confidence}%`,
                              backgroundColor: getConfidenceColor(
                                item.confidence
                              ),
                            }}
                          ></div>
                        </div>
                        <div className="confidence-value">
                          {item.confidence.toFixed(1)}%
                        </div>
                      </div>

                      {item.explanation && item.explanation.length > 0 && (
                        <div className="explanation-section">
                          <h4>Key Factors</h4>
                          <div className="factors-list">
                            {item.explanation.map((exp, idx) => (
                              <div key={idx} className="factor-item">
                                <span className="factor-word">
                                  {exp.word}
                                </span>
                                <span
                                  className={`factor-support factor-${exp.support.toLowerCase()}`}
                                >
                                  {exp.support}
                                </span>
                                <span className="factor-weight">
                                  {exp.weight.toFixed(4)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="item-footer">
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  )}
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
