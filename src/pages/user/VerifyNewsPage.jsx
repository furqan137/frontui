import React, { useState, useMemo } from "react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            Submit News for Verification
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Verify articles, claims, or links to detect potential misinformation
          </p>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-8 mb-8">
          
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab("text")}
              className={`px-6 py-3 font-semibold rounded-t-xl transition ${
                activeTab === "text"
                  ? "text-white bg-gradient-to-r from-blue-600 to-cyan-600"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              📝 Text Input
            </button>
            <button
              onClick={() => setActiveTab("link")}
              className={`px-6 py-3 font-semibold rounded-t-xl transition ${
                activeTab === "link"
                  ? "text-white bg-gradient-to-r from-blue-600 to-cyan-600"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              🔗 Paste Link
            </button>
          </div>

          {/* Input Section */}
          <div className="mb-8">
            {activeTab === "text" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                  Article Text
                </label>
                <textarea
                  placeholder="Copy and paste news article..."
                  value={articleText}
                  onChange={(e) => setArticleText(e.target.value)}
                  maxLength={5000}
                  className="w-full h-48 p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
              </div>
            )}

            {activeTab === "link" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                  Article URL
                </label>
                <input
                  placeholder="Paste article or claim link (https://...)..."
                  value={pasteLink}
                  onChange={(e) => setPasteLink(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            )}
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                📂 Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option>Politics</option>
                <option>Health</option>
                <option>Technology</option>
                <option>Sports</option>
                <option>Business</option>
                <option>World</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                📄 Document
              </label>
              <label className="flex items-center justify-center w-full px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 cursor-pointer transition">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
                  {file ? file.name : "Upload PDF, DOCX"}
                </span>
                <input type="file" accept=".pdf,.doc,.docx" onChange={onFileUpload} className="hidden" />
              </label>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                📍 Location
              </label>
              <input
                placeholder="Country or Region"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
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

        {/* Verify Button */}
        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl mb-6"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Analyzing Content...
            </span>
          ) : (
            '🔍 Verify Now'
          )}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            
            {/* Main Result Card */}
            <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analysis Result</h2>
                <span className="text-4xl">
                  {result.prediction === 'Fake' ? '🚨' : '✓'}
                </span>
              </div>

              {/* Prediction */}
              <div className="mb-8">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Classification</p>
                <div className={`inline-block px-6 py-3 rounded-xl font-bold text-2xl ${
                  result.prediction === 'Fake'
                    ? 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300'
                    : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                }`}>
                  {result.prediction}
                </div>
              </div>

              {/* Probability Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Real Probability</label>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {result.realProb ? (result.realProb * 100).toFixed(1) : '0'}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-1000"
                      style={{ width: `${result.realProb ? result.realProb * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Fake Probability</label>
                    <span className="font-bold text-red-600 dark:text-red-400">
                      {result.fakeProb ? (result.fakeProb * 100).toFixed(1) : '0'}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-1000"
                      style={{ width: `${result.fakeProb ? result.fakeProb * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Confidence */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Overall Confidence</label>
                  <span className="font-bold text-slate-900 dark:text-white text-lg">
                    {result.confidence ? (result.confidence * 100).toFixed(1) : '0'}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 transition-all duration-1000"
                    style={{ width: `${result.confidence ? result.confidence * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Factors Analysis */}
            {result.explanation && result.explanation.length > 0 && (
              <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contributing Factors</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Fake Indicators */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                      🚨 Indicators of Fake
                    </h4>
                    <div className="space-y-2">
                      {result.explanation
                        .filter(f => f.weight < 0 || f.factor_type === 'Indicates Fake')
                        .map((factor, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{factor.name}</p>
                            <p className="text-xs text-red-600 dark:text-red-400 font-bold mt-1">
                              Weight: {factor.weight.toFixed(4)}
                            </p>
                          </div>
                        ))}
                      {result.explanation.filter(f => f.weight < 0 || f.factor_type === 'Indicates Fake').length === 0 && (
                        <p className="text-sm text-slate-600 dark:text-slate-400">No fake indicators found</p>
                      )}
                    </div>
                  </div>

                  {/* Real Indicators */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                      ✓ Indicators of Real
                    </h4>
                    <div className="space-y-2">
                      {result.explanation
                        .filter(f => f.weight > 0 || f.factor_type === 'Indicates Real')
                        .map((factor, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{factor.name}</p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                              Weight: {factor.weight.toFixed(4)}
                            </p>
                          </div>
                        ))}
                      {result.explanation.filter(f => f.weight > 0 || f.factor_type === 'Indicates Real').length === 0 && (
                        <p className="text-sm text-slate-600 dark:text-slate-400">No real indicators found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Keywords */}
            {keywords.length > 0 && (
              <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">🔍 Keyword Frequency Analysis</h3>
                
                <div className="space-y-4">
                  {keywords.map((keyword, idx) => {
                    const maxCount = Math.max(...keywords.map(k => k.count));
                    const percentage = (keyword.count / maxCount) * 100;
                    const colors = [
                      'from-blue-500 to-blue-600',
                      'from-cyan-500 to-cyan-600',
                      'from-teal-500 to-teal-600',
                      'from-emerald-500 to-emerald-600',
                      'from-violet-500 to-violet-600',
                      'from-pink-500 to-pink-600',
                      'from-orange-500 to-orange-600',
                      'from-amber-500 to-amber-600',
                    ];
                    const colorClass = colors[idx % colors.length];
                    return (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-slate-900 dark:text-white">{keyword.name}</span>
                          <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                            {keyword.count} occurrences
                          </span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-8">
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">📝 Text Length</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {(articleText || pasteLink).length}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">characters</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">🎯 Category</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{category}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">📍 Location</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {location || "N/A"}
                </p>
              </div>
            </div>

            {/* Analyze Another Button */}
            <button
              onClick={() => {
                setResult(null);
                setArticleText("");
                setPasteLink("");
              }}
              className="w-full px-8 py-4 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
            >
              ↻ Analyze Another Article
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
