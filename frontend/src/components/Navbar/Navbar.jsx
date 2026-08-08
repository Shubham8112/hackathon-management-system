import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { FaTerminal, FaSignOutAlt, FaBookOpen, FaUserShield, FaPlusCircle, FaCode, FaColumns } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin, isOrganizer } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-inner container">
        <Link to="/dashboard" className="navbar-logo">
          <FaTerminal className="logo-icon" />
          <span>Hack<span className="logo-accent">Verse</span></span>
        </Link>

        {user && (
          <div className="nav-links">
            <Link to="/dashboard" className={`nav-link ${isActive("/dashboard")}`}>
              <FaColumns />
              <span>Dashboard</span>
            </Link>
            <Link to="/hackathons" className={`nav-link ${isActive("/hackathons")}`}>
              <FaCode />
              <span>Hackathons</span>
            </Link>
            <Link to="/my-hackathons" className={`nav-link ${isActive("/my-hackathons")}`}>
              <FaBookOpen />
              <span>My Registrations</span>
            </Link>

            {(isAdmin || isOrganizer) && (
              <Link to="/create-hackathon" className={`nav-link ${isActive("/create-hackathon")}`}>
                <FaPlusCircle />
                <span>Create Hackathon</span>
              </Link>
            )}

            {isAdmin && (
              <Link to="/admin-dashboard" className={`nav-link ${isActive("/admin-dashboard")}`}>
                <FaUserShield />
                <span>Admin Portal</span>
              </Link>
            )}
          </div>
        )}

        <div className="navbar-actions">
          <Link to="/about" className={`nav-link-about ${isActive("/about")}`}>
            About
          </Link>
          
          {user ? (
            <div className="user-profile-menu">
              <div className="user-avatar" title={`${user.name} (${user.role})`}>
                {getInitials(user.name)}
              </div>
              <div className="user-info-popover">
                <p className="popover-name">{user.name}</p>
                <p className="popover-email">{user.email}</p>
                <span className={`badge badge-role role-${user.role}`}>
                  {user.role}
                </span>
                <hr className="popover-divider" />
                <button className="popover-logout-btn" onClick={handleLogout}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn btn-secondary btn-sm">Log In</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;