import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import RoleSelector from "./RoleSelector";
import "./SignupForm.css";

/* ICONS */
import emailIcon from "../../assets/icons/email.png";
import lockIcon from "../../assets/icons/lock.png";

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [role, setRole] = useState("user"); // default user

  const [error, setError] = useState("");
  const [successRole, setSuccessRole] = useState(null);

  const navigate = useNavigate();

  const validateEmail = (email) =>
    String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) return setError("Please enter your full name.");
    if (!validateEmail(email)) return setError("Enter a valid email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    if (!termsAccepted) return setError("Please accept Terms & Conditions.");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: fullName });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      setSuccessRole(role);
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      console.error(err);
      setError("Signup failed. Email may already exist.");
    }
  };

  /* SUCCESS SCREEN */
  if (successRole) {
    return (
      <div className="signup-success-screen">
        <h2>🎉 Account Created Successfully!</h2>
        <p>Your account has been created as:</p>
        <h3 className="role-success">{successRole.toUpperCase()}</h3>
        <p>Redirecting you to login...</p>
      </div>
    );
  }

  return (
    <div className="signup-card">
      <h1 className="signup-title">Create Account</h1>
      <p className="signup-subtitle">Your digital truth begins here</p>

      {error && <div className="signup-error">{error}</div>}

      <form onSubmit={handleSignup} className="signup-form">

        {/* FULL NAME */}
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="signup-input"
        />

        {/* EMAIL WITH ICON */}
        <div className="signup-input-wrapper">
          <img src={emailIcon} alt="email" className="signup-input-icon" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
        </div>

        {/* PASSWORD WITH ICON + TOGGLE */}
        <div className="signup-input-wrapper">
          <img src={lockIcon} alt="password" className="signup-input-icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />

          <button
            type="button"
            className="show-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="signup-input-wrapper">
          <img src={lockIcon} alt="password" className="signup-input-icon" />

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-input"
          />

          <button
            type="button"
            className="show-password-btn"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* ROLE SELECTOR */}
        <RoleSelector currentRole={role} onRoleSelect={setRole} />

        {/* TERMS CHECKBOX */}
        <label className="signup-checkbox">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
          <span>
            I agree to the <Link to="/terms" className="signup-link">Terms & Conditions</Link>
          </span>
        </label>

        <button type="submit" className="signup-btn">Register</button>
      </form>

      <p className="signup-footer">
        Already have an account?{" "}
        <Link to="/login" className="signup-link">Login</Link>
      </p>
    </div>
  );
}
