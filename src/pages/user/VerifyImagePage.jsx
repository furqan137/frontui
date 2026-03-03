import React, { useState, useRef } from "react";
import "./styles/VerifyImagePage.css";

export default function VerifyImagePage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  // Handle File Upload
  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG, PNG, JPEG, WEBP images are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Max file size is 10MB.");
      return;
    }

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
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Image received — backend model integration ready.");
    }, 2000);
  };

  return (
    <div className="verify-image-container">

      <h1 className="vi-title">Upload Image for Verification</h1>

      <div className="vi-layout">

        {/* LEFT SIDE UPLOAD BOX */}
        <div
          className="vi-upload-box"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => fileInputRef.current.click()}
        >
          {!image ? (
            <>
              <div className="vi-upload-icon">🖼️</div>

              <p className="vi-drag-text">Drag and drop an image here</p>
              <span className="vi-or">OR</span>

              <button
                className="vi-choose-btn"
                onClick={() => fileInputRef.current.click()}
              >
                Choose File
              </button>

              <p className="vi-file-info">.JPG, .PNG, .JPEG, .WEBP — Max 10MB</p>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </>
          ) : (
            <>
              {/* Preview */}
              <img
                src={image.preview}
                alt="preview"
                className="vi-preview-img"
              />

              <button
                className="vi-remove-btn"
                onClick={() => setImage(null)}
              >
                Remove Image
              </button>
            </>
          )}
        </div>

        {/* RIGHT SIDE INFO BOX */}
        <div className="vi-info">
          <p className="vi-info-text">
            Your image will be analyzed using advanced deepfake detection
            models.
          </p>

          <div className="vi-tip-box">
            <span className="vi-tip-icon">⚠️</span>
            <span>
              Clear faces or high-resolution images improve detection accuracy.
            </span>
          </div>
        </div>
      </div>

      {/* VERIFICATION BUTTON */}
      <button
        className="vi-submit-btn"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Start Verification"}
      </button>

      {/* LOADING LABEL */}
      {loading && <p className="vi-loading">Analyzing image…</p>}

    </div>
  );
}
