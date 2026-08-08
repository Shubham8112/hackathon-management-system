import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { FaTerminal, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaInfoCircle } from "react-icons/fa";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setErrorMsg(result.message);
    }
  };

  const handleFillDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword("password123");
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
            <h3>Welcome Back</h3>
            <p>Log in to access your hackathons and dashboard</p>
          </div>

          {errorMsg && (
            <div className="auth-error-banner animate-fade-in">
              <FaInfoCircle />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="auth-form">
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
              <div className="label-row">
                <label htmlFor="password">Password</label>
              </div>
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
              {loading ? "Authenticating..." : "Log In"}
              {!loading && <FaArrowRight />}
            </button>
          </form>

          <div className="auth-card-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="auth-redirect-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="demo-credentials-box">
          <p className="demo-title">Quick Demo Login</p>
          <div className="demo-buttons">
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => handleFillDemo("admin@test.com")}
            >
              Admin Demo
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => handleFillDemo("organizer@test.com")}
            >
              Organizer Demo
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => handleFillDemo("participant@test.com")}
            >
              Participant Demo
            </button>
          </div>
          <span className="demo-hint">Click button to fill form, password is <b>password123</b></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
