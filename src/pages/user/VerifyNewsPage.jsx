import React, { useState, useMemo } from "react";
import "./styles/VerifyNewsPage.css";
import { useNavigate } from "react-router-dom";

// Extract keywords from text
const extractKeywords = (text) => {
  if (!text) return [];
  
  // Common stop words to filter out
  const stopWords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "from",
    "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did",
    "will", "would", "could", "should", "may", "might", "can", "must", "it", "its", "that", "this",
    "as", "than", "which", "who", "what", "when", "where", "why", "how", "all", "each", "every",
    "both", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own",
    "same", "so", "just", "up", "out", "if", "about", "after", "before", "between", "into", "through",
    "during", "above", "below", "while", "until", "he", "she", "we", "they", "me", "you", "him", "her", "us", "them"
  ]);

  // Split text into words and clean
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // Remove special characters
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  // Count word frequency
  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Get top 8 keywords
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word, count]) => ({ name: word, count }));
};

export default function VerifyNewsPage() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  // UI State
  const [activeTab, setActiveTab] = useState("text"); // text | link
  const [articleText, setArticleText] = useState("");
  const [pasteLink, setPasteLink] = useState("");
  const [category, setCategory] = useState("Politics");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Compute keywords outside of render condition
  const keywords = useMemo(() => {
    return extractKeywords(articleText || pasteLink);
  }, [articleText, pasteLink]);

  // Handle File Upload
  const onFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit Handler
  const onSubmit = async () => {
    let textToAnalyze = "";
    const isUrl = activeTab === "link";
    
    if (isUrl) {
      if (!pasteLink.trim()) {
        setError("Please enter a valid URL");
        return;
      }
      textToAnalyze = pasteLink;
    } else {
      if (!articleText.trim()) {
        setError("Please enter text to analyze");
        return;
      }
      textToAnalyze = articleText;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // If URL, first extract content from it
      if (isUrl) {
        try {
          const crawlResponse = await fetch("/api/crawl-url", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: textToAnalyze }),
          });

          if (!crawlResponse.ok) {
            const crawlError = await crawlResponse.json();
            throw new Error(crawlError.message || "Failed to read URL content");
          }

          const crawlData = await crawlResponse.json();
          textToAnalyze = crawlData.content; // Use extracted content
          console.log(`✓ Extracted ${crawlData.content_length} characters from URL`);
        } catch (crawlErr) {
          throw new Error(`URL extraction failed: ${crawlErr.message}`);
        }
      }

      // Now analyze the extracted/input content
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textToAnalyze }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze content");
      }

      const data = await response.json();
      setResult(data);

      // Save to history
      const history = JSON.parse(localStorage.getItem("analysisHistory") || "[]");
      history.unshift({
        text: isUrl ? pasteLink : articleText,
        prediction: data.prediction,
        confidence: data.confidence,
        timestamp: new Date().toISOString(),
        category: category,
        location: location,
        source: isUrl ? "URL" : "Text",
      });
      localStorage.setItem("analysisHistory", JSON.stringify(history.slice(0, 50))); // Keep last 50
    } catch (err) {
      setError(err.message || "Failed to analyze content. Make sure the Python API is running on localhost:5001");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">

      {/* PAGE TITLE */}
      <h1 className="verify-title">Submit News for Verification</h1>
      <p className="verify-subtitle">
        Submit articles, claims, or links to verify authenticity.
      </p>

      <div className="verify-card">
        
        {/* TABS */}
        <div className="verify-tabs">
          <button
            className={activeTab === "text" ? "active" : ""}
            onClick={() => setActiveTab("text")}
          >
            Text Input
          </button>

          <button
            className={activeTab === "link" ? "active" : ""}
            onClick={() => setActiveTab("link")}
          >
            Paste Link
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="verify-input-area">

          {/* TEXT INPUT TAB */}
          {activeTab === "text" && (
            <textarea
              className="verify-textarea"
              placeholder="Copy and paste news article..."
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              maxLength={5000}
            />
          )}

          {/* LINK INPUT TAB */}
          {activeTab === "link" && (
            <input
              className="verify-input"
              placeholder="Paste article or claim link..."
              value={pasteLink}
              onChange={(e) => setPasteLink(e.target.value)}
            />
          )}

          {/* FORM GRID */}
          <div className="verify-grid">

            {/* CATEGORY */}
            <div className="verify-field">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Politics</option>
                <option>Health</option>
                <option>Technology</option>
                <option>Sports</option>
                <option>Business</option>
                <option>World</option>
              </select>
            </div>

            {/* FILE UPLOAD */}
            <div className="verify-field">
              <label>Upload Document</label>

              <label className="verify-upload-btn">
                {file ? file.name : "Upload PDF, DOCX"}
                <input type="file" accept=".pdf,.doc,.docx" onChange={onFileUpload} />
              </label>
            </div>

            {/* LOCATION */}
            <div className="verify-field-full">
              <label>Location (optional)</label>
              <input
                className="verify-input"
                placeholder="Select location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && <div className="verify-error">{error}</div>}

      {/* VERIFY BUTTON */}
      <button className="verify-btn" onClick={onSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "🔍 Verify Now"}
      </button>

      {/* LOADING INDICATOR */}
      {loading && <p className="verify-loading">⏳ Analyzing content...</p>}

      {/* RESULT DISPLAY */}
      {result && (
        <div className="verify-result">
          <div className="result-card">
            <h2>Analysis Result</h2>
            
            {/* MAIN PREDICTION SECTION */}
            <div className="result-main">
              <div className="result-prediction">
                <span className="result-label">Prediction:</span>
                <span className={`result-value ${result.prediction.toLowerCase()}`}>
                  {result.prediction}
                </span>
                <span className="result-accuracy">Accuracy: {result.confidence}%</span>
              </div>

              {/* PROBABILITY COMPARISON */}
              <div className="probability-comparison">
                <div className="prob-item prob-real">
                  <div className="prob-label">Real Probability</div>
                  <div className="prob-bar">
                    <div className="prob-fill-real" style={{ width: `${parseFloat(result.real_probability)}%` }}></div>
                  </div>
                  <div className="prob-value">{result.real_probability}%</div>
                </div>
                <div className="prob-item prob-fake">
                  <div className="prob-label">Fake Probability</div>
                  <div className="prob-bar">
                    <div className="prob-fill-fake" style={{ width: `${parseFloat(result.fake_probability)}%` }}></div>
                  </div>
                  <div className="prob-value">{result.fake_probability}%</div>
                </div>
              </div>
            </div>

            {/* FACTORS ANALYSIS */}
            {result.explanation && result.explanation.length > 0 && (
              <div className="result-factors">
                <h3>Contributing Factors Analysis</h3>
                
                <div className="factors-grid">
                  {/* FACTORS SUPPORTING FAKE */}
                  <div className="factors-section fake-factors">
                    <h4>🚨 Indicators of Fake News</h4>
                    <div className="factors-list">
                      {result.explanation
                        .filter(f => f.factor_type === 'Indicates Fake')
                        .map((factor, idx) => (
                          <div key={idx} className="factor-item fake-item">
                            <div className="factor-name">{factor.name}</div>
                            <div className="factor-score">{factor.weight.toFixed(4)}</div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* FACTORS SUPPORTING REAL */}
                  <div className="factors-section real-factors">
                    <h4>✓ Indicators of Real News</h4>
                    <div className="factors-list">
                      {result.explanation
                        .filter(f => f.factor_type === 'Indicates Real')
                        .map((factor, idx) => (
                          <div key={idx} className="factor-item real-item">
                            <div className="factor-name">{factor.name}</div>
                            <div className="factor-score">{factor.weight.toFixed(4)}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* KEYWORDS SECTION */}
            {keywords.length > 0 && (
              <div className="result-keywords">
                <div className="keywords-header">
                  <h3>🔍 Keywords Found & Frequency</h3>
                  <span className="keywords-count">Total: {keywords.length} keywords</span>
                </div>
                
                {/* KEYWORDS BAR CHART */}
                <div className="keywords-chart">
                  {keywords.map((keyword, idx) => {
                    const maxCount = Math.max(...keywords.map(k => k.count));
                    const percentage = (keyword.count / maxCount) * 100;
                    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
                    const color = colors[idx % colors.length];
                    return (
                      <div key={idx} className="keyword-bar-item">
                        <div className="keyword-label">{keyword.name}</div>
                        <div className="keyword-bar-container">
                          <div 
                            className="keyword-bar-fill" 
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: color,
                              transition: 'width 0.6s ease'
                            }}
                          >
                            <span className="keyword-bar-value">{keyword.count}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUMMARY STATS */}
            <div className="result-summary">
              <div className="summary-item">
                <span className="summary-icon">📝</span>
                <span className="summary-label">Text Length:</span>
                <span className="summary-value">{(articleText || pasteLink).length} characters</span>
              </div>
              <div className="summary-item">
                <span className="summary-icon">🎯</span>
                <span className="summary-label">Category:</span>
                <span className="summary-value">{category}</span>
              </div>
              <div className="summary-item">
                <span className="summary-icon">📍</span>
                <span className="summary-label">Location:</span>
                <span className="summary-value">{location || "Not specified"}</span>
              </div>
            </div>

            <button
              className="verify-btn-secondary"
              onClick={() => {
                setResult(null);
                setArticleText("");
                setPasteLink("");
              }}
            >
              Analyze Another
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
