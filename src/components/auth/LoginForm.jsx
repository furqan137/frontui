import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";

import emailIcon from "../../assets/icons/email.png";
import lockIcon from "../../assets/icons/lock.png";
import googleIcon from "../../assets/icons/google.png";
import githubIcon from "../../assets/icons/github.png";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Sign in
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // 2️⃣ Fetch Firestore user profile
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        setError("No profile found! Contact support.");
        return;
      }

      const { role } = snap.data();

      // 3️⃣ ROLE BASED REDIRECT
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/dashboard");
      } else {
        navigate("/guest-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">

      <h1 className="login-title">Welcome Back!</h1>
      <p className="login-subtitle">Secure your truth.</p>

      {error && <div className="login-error">{error}</div>}

      <form onSubmit={handleLogin} className="login-form">

        {/* Email */}
        <div className="login-input-wrapper">
          <img src={emailIcon} alt="email" className="login-input-icon" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
        </div>

        {/* Password */}
        <div className="login-input-wrapper">
          <img src={lockIcon} alt="password" className="login-input-icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          <button
            type="button"
            className="show-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="login-btn">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="forgot-wrapper">
        <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
      </div>

      <div className="separator"><span>or</span></div>

      {/* Social Buttons */}
      <button className="social-btn google-btn">
        <img src={googleIcon} alt="Google" />
        Google Login
      </button>

      <button className="social-btn github-btn">
        <img src={githubIcon} alt="GitHub" />
        GitHub
      </button>

      <p className="login-footer">
        Don’t have an account?{" "}
        <Link to="/signup" className="login-link">Signup</Link>
      </p>

    </div>
  );
}
