import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { FaTerminal, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserPlus, FaArrowRight, FaInfoCircle } from "react-icons/fa";
import "../Login/login.css"; // Reuse auth page styling

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("participant"); // Default role
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    const result = await signup(name, email, password, role);
    setLoading(false);

    if (result.success) {
      setSuccessMsg(result.message + " Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card-wrapper">
        <div className="auth-logo-header">
          <FaTerminal className="auth-logo-icon" />
          <h2>Hack<span className="logo-accent">Verse</span></h2>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <h3>Create Account</h3>
            <p>Join HackVerse and participate or organize hackathons</p>
          </div>

          {errorMsg && (
            <div className="auth-error-banner animate-fade-in">
              <FaInfoCircle />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="badge badge-success animate-fade-in" style={{ width: "100%", padding: "12px", marginBottom: "20px", display: "flex", gap: "10px", textTransform: "none" }}>
              <FaInfoCircle />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-with-icon">
                <FaUser className="input-field-icon" />
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-field-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <FaLock className="input-field-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Select Role</label>
              <div className="role-segmented-container">
                <button
                  type="button"
                  className={`role-segment ${role === "participant" ? "active" : ""}`}
                  onClick={() => setRole("participant")}
                  disabled={loading}
                >
                  Participant
                </button>
                <button
                  type="button"
                  className={`role-segment ${role === "organizer" ? "active" : ""}`}
                  onClick={() => setRole("organizer")}
                  disabled={loading}
                >
                  Organizer
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
              {loading ? "Registering..." : "Sign Up"}
              {!loading && <FaUserPlus />}
            </button>
          </form>

          <div className="auth-card-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-redirect-link">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
