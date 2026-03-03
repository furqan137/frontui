import React, { useState, useRef } from "react";

export default function VerifyImagePage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  // Handle File Upload
  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPG, PNG, JPEG, WEBP images are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }

    setError("");
    setImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const onSubmit = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setError(""); // Clear after success
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            Upload Image for Verification
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Verify images using advanced deepfake detection AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              onClick={() => !image && fileInputRef.current.click()}
              className={`backdrop-blur-xl rounded-2xl border-2 border-dashed transition cursor-pointer ${
                image
                  ? 'border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20'
                  : 'border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 bg-white/70 dark:bg-slate-800/70'
              } p-12 shadow-xl`}
            >
              {!image ? (
                <div className="text-center space-y-6">
                  <div className="text-6xl animate-bounce">🖼️</div>
                  
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Drag and drop your image here
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      or click to browse files
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current.click();
                    }}
                    className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition inline-block"
                  >
                    Choose File
                  </button>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Supported formats: JPG, PNG, JPEG, WEBP (Max 10MB)
                  </p>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={(e) => handleFile(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Preview */}
                  <div className="flex justify-center">
                    <img
                      src={image.preview}
                      alt="preview"
                      className="max-w-full max-h-96 rounded-xl shadow-lg"
                    />
                  </div>

                  {/* File Info */}
                  <div className="text-center space-y-2">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {image.file.name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {(image.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                    }}
                    className="w-full px-6 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                  >
                    ✕ Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="space-y-4">
            {/* Info Card */}
            <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                How It Works
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <span className="text-xl">1️⃣</span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Upload Image</p>
                    <p className="text-slate-600 dark:text-slate-400">Drag or click to select</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">2️⃣</span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">AI Analysis</p>
                    <p className="text-slate-600 dark:text-slate-400">Advanced detection models</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">3️⃣</span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Get Results</p>
                    <p className="text-slate-600 dark:text-slate-400">Detailed verification report</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="backdrop-blur-xl bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xl p-6">
              <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-4 flex items-center gap-2">
                <span>💡</span> Tips for Best Results
              </h3>
              <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-300">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Use high-resolution images</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Clear face detection improves accuracy</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Avoid heavily compressed images</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Multiple angles increase reliability</span>
                </li>
              </ul>
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

        {/* Verification Button */}
        <button
          onClick={onSubmit}
          disabled={loading || !image}
          className="w-full px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl mb-4"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Analyzing Image...
            </span>
          ) : image ? (
            '🔍 Start Verification'
          ) : (
            '📤 Upload an Image First'
          )}
        </button>

        {/* Secondary Info */}
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Your images are processed securely and not stored
          </p>
        </div>
      </div>
    </div>
  );
}
